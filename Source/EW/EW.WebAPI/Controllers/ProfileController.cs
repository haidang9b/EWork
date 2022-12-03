using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        public ProfileController(IUserService userService, ILogger<ProfileController> logger, IUserCVService userCVService)
        {
            _userService = userService;
            _logger = logger;
            _userCVService = userCVService;
        }


        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile()
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = User.Identity.Name });
                result.Data = new UserProfileViewModel
                {
                    Experiences = user.Experences,
                    CVs = await _userCVService.GetUserCVsByUser(user),
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


        [HttpPut("update-cover-letter")]
        public async Task<IActionResult> UpdateCoverLetter(UpdateCoverLetterModel model)
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = User.Identity.Name });
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

        [HttpDelete("remove-cv/{id:long}")]
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
    }
}
