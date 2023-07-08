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
    public class WorkHistoriesController : ControllerBase
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IProfileSerivce _profileSerivce;
        private readonly IWorkHistoryService _workHistoryService;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public WorkHistoriesController(
            ILogger<ProfileController> logger, 
            IProfileSerivce profileSerivce, 
            IWorkHistoryService workHistoryService
        )
        {
            _logger = logger;
            _profileSerivce = profileSerivce;
            _workHistoryService = workHistoryService;
        }

        /// <summary>
        /// Add new work history
        /// </summary>
        /// <param name="model">AddWorkHistory</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddWorkHistory model)
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
                if (data is null)
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
            catch (Exception ex)
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _workHistoryService.Delete(new WorkHistory { Id = id });
                if (result.IsSuccess)
                {
                    result.Message = "Xóa kinh nghiệm thành công";
                    result.Data = new WorkHistory { Id = id };
                }
                else
                {
                    result.Message = "Xóa kinh nghiệm thất bại";
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
        /// Update work history 
        /// </summary>
        /// <param name="model">WorkHistory</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut]
        public async Task<IActionResult> Put(WorkHistory model)
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
