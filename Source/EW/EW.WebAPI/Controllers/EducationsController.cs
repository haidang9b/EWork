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
        private readonly ILogger<ProfileController> _logger;
        private readonly IEducationService _educationService;
        private readonly IProfileSerivce _profileSerivce;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public EducationsController(
            ILogger<ProfileController> logger, 
            IEducationService educationService, 
            IProfileSerivce profileSerivce
        )
        {
            _logger = logger;
            _educationService = educationService;
            _profileSerivce = profileSerivce;
        }

        /// <summary>
        /// Add new Education
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddEducationModel model)
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
                    result.IsSuccess = false;
                    result.Message = "Không thể thêm học vấn này";
                    return Ok(result);
                }
                else
                {
                    result.IsSuccess = true;
                    result.Message = "Thêm học vấn thành công";
                    result.Data = data;
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
        /// Remove education
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _educationService.Delete(new Education { Id = id });
                if (result.IsSuccess)
                {
                    result.Message = "Xóa học vấn thành công";
                    result.Data = new Education { Id = id };
                }
                else
                {
                    result.Message = "Xóa học vấn thất bại";
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
        /// Update education
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut]
        public async Task<IActionResult> Put(Education model)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _educationService.Update(model);
                if (result.IsSuccess)
                {
                    result.Message = "Cập nhật học vấn thành công";
                    result.Data = model;
                }
                else
                {
                    result.Message = "Cập nhật học vấn thất bại";
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
