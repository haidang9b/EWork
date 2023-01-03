using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<ProfileController> _logger;
        private readonly IUserCVService _userCVService;
        private readonly IProfileSerivce _profileSerivce;
        private readonly IWorkHistoryService _workHistoryService;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ProfileController(IUserService userService, ILogger<ProfileController> logger, IUserCVService userCVService, IProfileSerivce profileSerivce, IWorkHistoryService workHistoryService)
        {
            _userService = userService;
            _logger = logger;
            _userCVService = userCVService;
            _profileSerivce = profileSerivce;
            _workHistoryService = workHistoryService;
        }

        /// <summary>
        /// Get get data: cover letter, cvs of user
        /// </summary>
        /// <returns>cover letter, cvs</returns>
        [HttpGet("get-document")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetProfile()
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = _username });
                var dataCV = await _userCVService.GetUserCVsByUser(user);
                result.Data = new UserProfileViewModel
                {
                    Experiences = user.Experences,
                    CVs = dataCV.OrderByDescending(item => item.CreatedDate).ToList(),
                    CoverLetter = user.CoverLetter,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Update cover letter of student
        /// </summary>
        /// <param name="model">UpdateCoverLetterModel</param>
        /// <returns>is success and message</returns>
        [HttpPut("update-cover-letter")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> UpdateCoverLetter(UpdateCoverLetterModel model)
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = _username });
                if(user == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Cập nhật thư giới thiệu thất bại";
                } 
                else
                {
                    user.CoverLetter = model.CoverLetter;
                    
                    var updateResult = await _userService.UpdateUser(user);
                    result.IsSuccess = updateResult;
                    if (updateResult)
                    {
                        result.Data = model.CoverLetter;
                        result.Message = "Cập nhật thư giới thiệu thành công";
                    }    
                    else
                    {
                        result.Message = "Cập nhật thư giới thiệu thất bại";
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Remove cv of user
        /// </summary>
        /// <param name="Id">long</param>
        /// <returns></returns>
        [HttpDelete("remove-cv/{id:long}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> RemoveCVUser(long Id)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userCVService.GetUserCVByInfo(new UserCV { Id = Id });
                if(exist == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không có CV nào từ mã số này";
                    return Ok(result);

                }
                result.IsSuccess = await _userCVService.RemoveCV(exist);
                if (result.IsSuccess)
                {
                    result.Message = "Xóa CV này thành công";
                    result.Data = exist;
                }
                else
                {
                    result.Message = "Không thể xóa CV này";
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Get profile user request, role: student
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpGet("my-information")]
        public async Task<IActionResult> MyInformation()
        {
            var result = new ApiResult();
            try
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                if(profile == null)
                {
                    var initProfile = await _profileSerivce.InitProfile(new User { Username = _username });
                    result.IsSuccess = true;
                    result.Message = "Lấy dữ liệu thành công";
                    result.Data = initProfile;
                }
                else
                {
                    result.IsSuccess = true;
                    result.Message = "Lấy dữ liệu thành công";
                    result.Data = profile;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Update data contact and objective of student request
        /// </summary>
        /// <param name="ContactModel">model</param>
        /// <returns>data updated</returns>
        [Authorize(Roles = "Student")]
        [HttpPut("contact")]
        public async Task<IActionResult> EditContact(ContactModel model)
        {
            var result = new ApiResult();
            try
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                if(profile == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Vui lòng get dữ liệu trước khi update";
                    return Ok(result);
                }
                profile.EmailContact = model.EmailContact;
                profile.PhoneNumber = model.PhoneNumber;
                profile.Github = model.Github;
                profile.Linkedin = model.Linkedin;
                profile.Address = model.Address;
                profile.Objective = model.Objective;
                result.IsSuccess = await _profileSerivce.UpdateProfile(profile);
                if(result.IsSuccess)
                {
                    result.Data = profile;
                    result.Message = "Cập nhật thông tin thành công";
                }
                else
                {
                    result.Message = "Cập nhật thông tin thất bại";
                }
            }
            catch (Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Add new work history
        /// </summary>
        /// <param name="model">AddWorkHistory</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost("work-history")]
        public async Task<IActionResult> AddWorkHistory(AddWorkHistory model)
        {
            var result = new ApiResult();
            try
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                if (profile == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Vui lòng get dữ liệu trước khi update";
                    return Ok(result);
                }

                var newWorkHistory = new WorkHistory
                {
                    ProfileId = profile.Id,
                    Description = model.Description,
                    From = model.From,
                    To = model.To,
                    IsWorking = model.IsWorking,
                    CompanyName = model.CompanyName,
                };
                var data = await _workHistoryService.Add(newWorkHistory);
                if(data == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không thể thêm kinh nghiệm làm việc này";
                    return Ok(result);
                }
                else
                {
                    result.IsSuccess = true;
                    result.Message = "Thêm kinh nghiệm làm việc thành công";
                    result.Data = data;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }

            return Ok(result);
        }

        /// <summary>
        /// Remove work history by id
        /// </summary>
        /// <param name="id">long</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpDelete("work-history/{id}")]
        public async Task<IActionResult> DeleteWorkHistory(long id)
        {
            var result = new ApiResult();   
            try
            {
                result.IsSuccess = await _workHistoryService.Delete(new WorkHistory { Id = id });
                if(result.IsSuccess)
                {
                    result.Message = "Xóa kinh nghiệm thành công";
                    result.Data = new WorkHistory { Id = id };
                }
                else
                {
                    result.Message = "Xóa kinh nghiệm thất bại";
                }
            }
            catch(Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Update work history 
        /// </summary>
        /// <param name="model">WorkHistory</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut("work-history")]
        public async Task<IActionResult> UpdateWorkHistory(WorkHistory model)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _workHistoryService.Update(model);
                if (result.IsSuccess)
                {
                    result.Message = "Cập nhật kinh nghiệm thành công";
                    result.Data = model;
                }
                else
                {
                    result.Message = "Cập nhật kinh nghiệm thất bại";
                }
            }
            catch (Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }
    }
}
