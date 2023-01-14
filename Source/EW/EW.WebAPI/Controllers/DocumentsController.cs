using EW.Domain.Entities;
using EW.Services.Business;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Documents;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly ILogger<UploadsController> _logger;
        private readonly IUserCVService _userCVService;
        private readonly IUserService _userService;
        private readonly IProfileSerivce _profileSerivce;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public DocumentsController(ILogger<UploadsController> logger, IUserCVService userCVService, IUserService userService, IProfileSerivce profileSerivce)
        {
            _logger = logger;
            _userCVService = userCVService;
            _userService = userService;
            _profileSerivce = profileSerivce;
        }

        /// <summary>
        /// Get get data: cover letter, cvs of user
        /// </summary>
        /// <returns>cover letter, cvs</returns>
        [HttpGet]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Get()
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
                if (user == null)
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
        [HttpDelete("{id:long}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> RemoveCVUser(long Id)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userCVService.GetUserCVByInfo(new UserCV { Id = Id });
                if (exist == null)
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }
        /// <summary>
        /// Pick cv featured of user
        /// Check user have status turn on open for work, if tunrn on, use only change featured CV and can't update cv featured
        /// </summary>
        /// <param name="model">ChangeStatusCVModel</param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Put(ChangeStatusCVModel model)
        {
            var result = new ApiResult();
            try
            {
                var currentCV = await _userCVService.GetUserCVByInfo(new UserCV { Id = model.Id });
                if(currentCV != null && currentCV.User.Username == _username)
                {
                    var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                    if (profile != null && profile.IsOpenForWork && currentCV.Featured && !model.Featured) 
                    {
                        result.Message = "Bạn không thể tắt CV chính trong trạng thái đang tìm kiếm việc";
                        result.IsSuccess = false;
                        return Ok(result);
                    }
                    currentCV.Featured = model.Featured;
                    result.IsSuccess = await _userCVService.UpdateFeaturedCV(currentCV);                    
                    if (result.IsSuccess)
                    {
                        result.Message = "Cập nhật thành công cv chính";
                        result.Data = model;
                    }
                    else
                    {
                        result.Message = "Cập nhật thất bại cv chính";
                    }
                }
                else
                {
                    result.Message = "Bạn không sở hữu CV này";
                    result.IsSuccess = false;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
    }
}
