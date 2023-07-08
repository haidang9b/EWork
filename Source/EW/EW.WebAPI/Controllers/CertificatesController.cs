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
    public class CertificatesController : ControllerBase
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IProfileSerivce _profileSerivce;
        private readonly ICertificateService _certificateService;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public CertificatesController(ILogger<ProfileController> logger, IProfileSerivce profileSerivce, ICertificateService certificateService)
        {
            _logger = logger;
            _profileSerivce = profileSerivce;
            _certificateService = certificateService;
        }
        /// <summary>
        /// Add new Certificate
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddCertificateModel model)
        {
            var result = new ApiResult();
            try
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                if (profile is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Vui lòng get dữ liệu trước khi update";
                    return Ok(result);
                }

                var newCertificate = new Certificate
                {
                    ProfileId = profile.Id,
                    Description = model.Description,
                    From = model.From,
                    To = model.To,
                    CertificateName = model.CertificateName
                };
                var data = await _certificateService.Add(newCertificate);
                if (data is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không thể thêm chứng chỉ này";
                    return Ok(result);
                }
                else
                {
                    result.IsSuccess = true;
                    result.Message = "Thêm chứng chỉ thành công";
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
        /// Remove Certificate
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
                result.IsSuccess = await _certificateService.Delete(new Certificate { Id = id });
                if (result.IsSuccess)
                {
                    result.Message = "Xóa chứng chỉ thành công";
                    result.Data = new Education { Id = id };
                }
                else
                {
                    result.Message = "Xóa chứng chỉ thất bại";
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
        /// Update Certificate
        /// </summary>
        /// <param name="model">Certificate</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut]
        public async Task<IActionResult> Put(Certificate model)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _certificateService.Update(model);
                if (result.IsSuccess)
                {
                    result.Message = "Cập nhật chứng chỉ thành công";
                    result.Data = model;
                }
                else
                {
                    result.Message = "Cập nhật chứng chỉ thất bại";
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
