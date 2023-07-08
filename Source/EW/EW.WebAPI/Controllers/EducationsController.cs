using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationsController : ControllerBase
    {
        private readonly IEducationService _educationService;
        private readonly IProfileSerivce _profileSerivce;
        private readonly ApiResult _apiResult;

        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        public EducationsController(
            IEducationService educationService,
            IProfileSerivce profileSerivce
        )
        {
            _educationService = educationService;
            _profileSerivce = profileSerivce;
            _apiResult = new();
        }

        /// <summary>
        /// Add new Education
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddEducationModel model)
        {
            var profile = await _profileSerivce.GetProfile(new User { Username = Username });
            if (profile is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Vui lòng get dữ liệu trước khi update";
                return Ok(_apiResult);
            }

            var newEducation = new Education
            {
                ProfileId = profile.Id,
                Description = model.Description,
                From = model.From,
                To = model.To,
                OrgName = model.OrgName
            };
            var data = await _educationService.Add(newEducation);
            if (data is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không thể thêm học vấn này";
                return Ok(_apiResult);
            }
            else
            {
                _apiResult.IsSuccess = true;
                _apiResult.Message = "Thêm học vấn thành công";
                _apiResult.Data = data;
            }

            return Ok(_apiResult);
        }

        /// <summary>
        /// Remove education
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _apiResult.IsSuccess = await _educationService.Delete(new Education { Id = id });
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Xóa học vấn thành công";
                _apiResult.Data = new Education { Id = id };
            }
            else
            {
                _apiResult.Message = "Xóa học vấn thất bại";
            }

            return Ok(_apiResult);
        }

        /// <summary>
        /// Update education
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut]
        public async Task<IActionResult> Put(Education model)
        {
            _apiResult.IsSuccess = await _educationService.Update(model);
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Cập nhật học vấn thành công";
                _apiResult.Data = model;
            }
            else
            {
                _apiResult.Message = "Cập nhật học vấn thất bại";
            }

            return Ok(_apiResult);
        }
    }
}
