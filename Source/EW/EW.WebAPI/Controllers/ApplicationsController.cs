using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Applications;
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
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IUserCVService _userCVService;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        private ApiResult _apiResult;

        public ApplicationsController(IApplicationService applicationService, ILogger<ApplicationsController> logger, IUserService userService, IRecruitmentPostService recruitmentPostService, IEmailService emailService, IUserCVService userCVService)
        {
            _applicationService = applicationService;
            _logger = logger;
            _userService = userService;
            _recruitmentPostService = recruitmentPostService;
            _emailService = emailService;
            _userCVService = userCVService;
            _apiResult = new ApiResult();
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
            var currentUser = await _userService.GetUser(new User { Username = _username });

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
            if (_apiResult.Data != null)
            {
                var body = string.Empty;
                var recruitmentPostCurrent = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.RecruitmentPostId });
                using (StreamReader reader = new StreamReader(Path.Combine("EmailTemplates/AppliedNotify.html")))
                {
                    body = reader.ReadToEnd();
                }
                var bodyBuilder = new System.Text.StringBuilder(body);
                bodyBuilder.Replace("{companyName}", recruitmentPostCurrent.Company.CompanyName);
                bodyBuilder.Replace("{receiver}", currentUser.FullName);
                var data = new EmailDataModel { Body = bodyBuilder.ToString(), Subject = $"[EWork] {recruitmentPostCurrent.Company.CompanyName} đã nhận được hồ sơ ứng tuyển của bạn", ToEmail = currentUser.Email };
                await _emailService.SendEmail(data);
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
                Username = _username,
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
                Username = _username,
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
            var currentUser = await _userService.GetUser(new User { Username = _username });
            if (currentUser.RoleId == (long)ERole.ID_Faculty)
            {
                _apiResult.Data = await _applicationService.GetApplieds();
            }
            else
            {
                _apiResult.Data = await _applicationService.GetAppliedsForBusiness(new User { Username = _username, });
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
            var isHasRole = await _applicationService.IsHasRole(new ApplicationUserModel { Username = _username, ApplicationId = model.Id });
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
            if (_apiResult.Data != null)
            {
                var currentUserCV = await _userCVService.GetUserCVByInfo(new UserCV { Id = model.UserCVId });
                var body = string.Empty;
                var recruitmentPostCurrent = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.RecruitmentPostId });
                using (StreamReader reader = new StreamReader(Path.Combine("EmailTemplates/MarkedNotify.html")))
                {
                    body = reader.ReadToEnd();
                }
                var bodyBuilder = new System.Text.StringBuilder(body);
                bodyBuilder.Replace("{companyName}", recruitmentPostCurrent.Company.CompanyName);
                bodyBuilder.Replace("{receiver}", currentUserCV.User.FullName);
                var data = new EmailDataModel { Body = bodyBuilder.ToString(), Subject = $"[EWork] {recruitmentPostCurrent.Company.CompanyName} đã đánh dấu hồ sơ của bạn", ToEmail = currentUserCV.User.Email };
                await _emailService.SendEmail(data);
            }

            return Ok(_apiResult);
        }
    }
}
