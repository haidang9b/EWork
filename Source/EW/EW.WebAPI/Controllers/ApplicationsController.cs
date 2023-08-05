using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.MessageSender;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Applications;
using EW.WebAPI.Models.Models.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IRecruitmentPostService _recruitmentPostService;
        private readonly IUserService _userService;
        private readonly IUserCVService _userCVService;
        private readonly IRabbitMQMessageSender _rabbitMQMessageSender;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        private readonly ApiResult _apiResult;

        public ApplicationsController(
            IApplicationService applicationService,
            IUserService userService,
            IRecruitmentPostService recruitmentPostService,
            IUserCVService userCVService,
            IRabbitMQMessageSender rabbitMQMessageSender
            )
        {
            _applicationService = applicationService;
            _userService = userService;
            _recruitmentPostService = recruitmentPostService;
            _userCVService = userCVService;
            _apiResult = new();
            _rabbitMQMessageSender = rabbitMQMessageSender;
        }

        /// <summary>
        /// Student apply job
        /// </summary>
        /// <param name="model">ApplicationRequestModel</param>
        /// <returns>data object request added</returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(ApplicationRequestModel model)
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });

            _apiResult.Data = await _applicationService.Add(new AddApplicationModel
            {
                RecruitmentPostId = model.RecruitmentPostId,
                UserCVId = model.UserCVId,
                UserId = currentUser.Id,
                CoverLetter = model.CoverLetter,
                Status = EApplicationStatus.ReceptionCV,
                Description = ""
            });

            _apiResult.Message = "Ứng tuyển thành công";

            if (_apiResult.Data is not null)
            {
                var recruitmentPostCurrent = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.RecruitmentPostId });

                var appliedNotify = new AppliedNotifyMessage
                {
                    CompanyName = recruitmentPostCurrent.Company.CompanyName,
                    FullName = currentUser.FullName,
                    ToEmail = currentUser.Email,
                };

                _rabbitMQMessageSender.SendMessage(appliedNotify, "DirectAppliedNotifyQueueName");
            }

            return Ok(_apiResult);
        }

        /// <summary>
        /// Get applications by username request
        /// </summary>
        /// <returns>Data applications of user</returns>
        [Authorize(Roles = "Student")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            _apiResult.Data = await _applicationService.GetByApplier(new User
            {
                Username = Username,
            });

            return Ok(_apiResult);
        }

        /// <summary>
        /// Get jobs applied of student, system will detect user request and response data
        /// </summary>
        /// <returns>List data jobs applied</returns>
        [Authorize(Roles = "Student")]
        [HttpGet("jobs-applied")]
        public async Task<IActionResult> GetJobsApplied()
        {
            _apiResult.Data = await _applicationService.GetJobsApplied(new User
            {
                Username = Username,
            });

            return Ok(_apiResult);
        }
        /// <summary>
        /// Get applied for business, this route will return data all applier and infor applied
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Business,Faculty")]
        [HttpGet("applieds")]
        public async Task<IActionResult> GetApplied()
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });
            if (currentUser.RoleId == (long)ERole.ID_Faculty)
            {
                _apiResult.Data = await _applicationService.GetApplieds();
            }
            else
            {
                _apiResult.Data = await _applicationService.GetAppliedsForBusiness(new User { Username = Username, });
            }
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }
        /// <summary>
        /// Update status and description of application
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Authorize(Roles = "Business")]
        [HttpPut]
        public async Task<IActionResult> UpdateApplication(UpdateProgressModel model)
        {
            var isHasRole = await _applicationService.IsHasRole(new ApplicationUserModel { Username = Username, ApplicationId = model.Id });
            if (!isHasRole)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Bạn không có quyền cập nhật";
                return Ok(_apiResult);
            }
            _apiResult.IsSuccess = await _applicationService.Update(new Application
            {
                Id = model.Id,
                Status = model.Status,
                Description = model.Description
            });
            if (_apiResult.IsSuccess)
            {
                _apiResult.Data = model;
                _apiResult.Message = "Cập nhật thông tin thành công";
            }
            else
            {
                _apiResult.Message = "Cập nhật thông tin không thành công";
            }


            return Ok(_apiResult);
        }
        /// <summary>
        /// This controller add new application by business
        /// </summary>
        /// <param name="model">MarkedApplicationRequestModel</param>
        /// <returns></returns>
        [Authorize(Roles = "Business")]
        [HttpPost("marked")]
        public async Task<IActionResult> MarkedUser(MarkedApplicationRequestModel model)
        {
            var newApplication = new AddApplicationModel
            {
                RecruitmentPostId = model.RecruitmentPostId,
                UserCVId = model.UserCVId,
                Description = model.Description,
                CoverLetter = "",
                Status = EApplicationStatus.Marked,
                UserId = model.UserId ?? 0,
            };
            _apiResult.Data = await _applicationService.Add(newApplication);
            _apiResult.Message = "Đánh dấu thành công";

            if (_apiResult.Data is not null)
            {
                var currentUserCV = await _userCVService.GetUserCVByInfo(new UserCV { Id = model.UserCVId });
                var recruitmentPostCurrent = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.RecruitmentPostId });

                var markedEmailDto = new MarkedEmailMessage
                {
                    CompanyName = recruitmentPostCurrent.Company.CompanyName,
                    FullName = currentUserCV.User.FullName,
                    ToEmail = currentUserCV.User.Email,
                };

                _rabbitMQMessageSender.SendMessage(markedEmailDto, "DirectMarkedEmailQueueName");

            }

            return Ok(_apiResult);
        }
    }
}