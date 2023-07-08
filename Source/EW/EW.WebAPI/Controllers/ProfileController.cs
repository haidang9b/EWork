using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using Microsoft.AspNetCore.Authorization;
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
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ProfileController(
            IUserService userService,
            ILogger<ProfileController> logger,
            IUserCVService userCVService,
            IProfileSerivce profileSerivce
        )
        {
            _userService = userService;
            _logger = logger;
            _userCVService = userCVService;
            _profileSerivce = profileSerivce;
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
                var profile = await _profileSerivce.GetProfile(new User { Username = Username });
                if (profile is null)
                {
                    var initProfile = await _profileSerivce.InitProfile(new User { Username = Username });
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
            catch (Exception ex)
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
                var profile = await _profileSerivce.GetProfile(new User { Username = Username });
                if (profile is null)
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
                profile.Skills = model.Skills;
                result.IsSuccess = await _profileSerivce.UpdateProfile(profile);
                if (result.IsSuccess)
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
        /// Turn on or turn off status open for work 
        /// </summary>
        /// <param name="model">UpdateStatusModel</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut("change-status-open-for-work")]
        public async Task<IActionResult> UpdateStatusOpenForWork(UpdateStatusModel model)
        {
            var result = new ApiResult();
            try
            {
                var currrentUser = await _userService.GetUser(new User { Username = Username });
                var profile = await _profileSerivce.GetProfile(new User { Username = Username });
                if (profile is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Vui lòng get dữ liệu trước khi update";
                    return Ok(result);
                }

                if (string.IsNullOrEmpty(profile.PhoneNumber)
                    || string.IsNullOrEmpty(profile.Objective)
                    || string.IsNullOrEmpty(profile.Skills))
                {
                    result.IsSuccess = false;
                    result.Message = "Bạn vui lòng điền đầy đủ thông tin trước khi bật tìm kiếm việc làm";
                    return Ok(result);
                }
                var cvsOfUser = await _userCVService.GetUserCVsByUser(currrentUser);
                if (!cvsOfUser.Where(item => item.Featured).Any())
                {
                    result.IsSuccess = false;
                    result.Message = "Bạn vui lòng chọn CV chính để bật tìm việc tại quản lý CV";
                    return Ok(result);
                }
                profile.IsOpenForWork = model.IsOpenForWork;
                result.IsSuccess = await _profileSerivce.UpdateProfile(profile);
                if (result.IsSuccess)
                {
                    result.Data = profile;
                    result.Message = model.IsOpenForWork ? "Bật tìm kiếm việc thành công" : "Tắt tìm kiếm việc thành công";
                }
                else
                {
                    result.Message = model.IsOpenForWork ? "Bật tìm kiếm việc thất bại" : "Tắt tìm kiếm việc thất bại";
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
        /// Get all profile is turning on open for work
        /// </summary>
        /// <returns></returns>
        [HttpGet("get-candidates-open-for-work")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCandidateOpenForWork()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _profileSerivce.GetProfileOpenForWorks();
                result.IsSuccess = true;
                result.Message = "Lấy dữ liệu thành công";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
    }
}
