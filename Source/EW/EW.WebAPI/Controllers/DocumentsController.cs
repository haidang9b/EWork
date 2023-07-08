using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Documents;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IUserCVService _userCVService;
        private readonly IUserService _userService;
        private readonly IProfileSerivce _profileSerivce;
        private readonly ApiResult _apiResult;

        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

        public DocumentsController(
            IUserCVService userCVService,
            IUserService userService,
            IProfileSerivce profileSerivce
        )
        {
            _userCVService = userCVService;
            _userService = userService;
            _profileSerivce = profileSerivce;
            _apiResult = new();
        }

        /// <summary>
        /// Get get data: cover letter, cvs of user
        /// </summary>
        /// <returns>cover letter, cvs</returns>
        [HttpGet]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Get()
        {
            var user = await _userService.GetUser(new User { Username = Username });
            var dataCV = await _userCVService.GetUserCVsByUser(user);
            _apiResult.Data = new UserProfileViewModel
            {
                Experiences = user.Experences,
                CVs = dataCV.OrderByDescending(item => item.CreatedDate).ToList(),
                CoverLetter = user.CoverLetter,
            };
            return Ok(_apiResult);
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
            var user = await _userService.GetUser(new User { Username = Username });
            if (user is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Cập nhật thư giới thiệu thất bại";
            }
            else
            {
                user.CoverLetter = model.CoverLetter;

                var updateResult = await _userService.UpdateUser(user);
                _apiResult.IsSuccess = updateResult;
                if (updateResult)
                {
                    _apiResult.Data = model.CoverLetter;
                    _apiResult.Message = "Cập nhật thư giới thiệu thành công";
                }
                else
                {
                    _apiResult.Message = "Cập nhật thư giới thiệu thất bại";
                }
            }
            return Ok(_apiResult);
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
            var exist = await _userCVService.GetUserCVByInfo(new UserCV { Id = Id });
            if (exist is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không có CV nào từ mã số này";
                return Ok(_apiResult);

            }
            _apiResult.IsSuccess = await _userCVService.RemoveCV(exist);
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Xóa CV này thành công";
                _apiResult.Data = exist;
            }
            else
            {
                _apiResult.Message = "Không thể xóa CV này";
            }
            return Ok(_apiResult);
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
            var currentCV = await _userCVService.GetUserCVByInfo(new UserCV { Id = model.Id });
            if (currentCV is not null && currentCV.User.Username == Username)
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = Username });
                if (profile is not null && profile.IsOpenForWork && currentCV.Featured && !model.Featured)
                {
                    _apiResult.Message = "Bạn không thể tắt CV chính trong trạng thái đang tìm kiếm việc";
                    _apiResult.IsSuccess = false;
                    return Ok(_apiResult);
                }
                currentCV.Featured = model.Featured;
                _apiResult.IsSuccess = await _userCVService.UpdateFeaturedCV(currentCV);
                if (_apiResult.IsSuccess)
                {
                    _apiResult.Message = "Cập nhật thành công cv chính";
                    _apiResult.Data = model;
                }
                else
                {
                    _apiResult.Message = "Cập nhật thất bại cv chính";
                }
            }
            else
            {
                _apiResult.Message = "Bạn không sở hữu CV này";
                _apiResult.IsSuccess = false;
            }
            return Ok(_apiResult);
        }
    }
}
