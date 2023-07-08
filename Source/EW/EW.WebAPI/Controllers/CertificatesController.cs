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
        private readonly IProfileSerivce _profileSerivce;
        private readonly ICertificateService _certificateService;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

        private readonly ApiResult _apiResult;

        public CertificatesController(
            IProfileSerivce profileSerivce,
            ICertificateService certificateService
        )
        {
            _profileSerivce = profileSerivce;
            _certificateService = certificateService;
            _apiResult = new();
        }
        /// <summary>
        /// Add new Certificate
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddCertificateModel model)
        {
            var profile = await _profileSerivce.GetProfile(new User { Username = Username });
            if (profile is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Vui lòng get dữ liệu trước khi update";
                return Ok(_apiResult);
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
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không thể thêm chứng chỉ này";
                return Ok(_apiResult);
            }
            else
            {
                _apiResult.IsSuccess = true;
                _apiResult.Message = "Thêm chứng chỉ thành công";
                _apiResult.Data = data;
            }

            return Ok(_apiResult);
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
            _apiResult.IsSuccess = await _certificateService.Delete(new Certificate { Id = id });
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Xóa chứng chỉ thành công";
                _apiResult.Data = new Education { Id = id };
            }
            else
            {
                _apiResult.Message = "Xóa chứng chỉ thất bại";
            }
            return Ok(_apiResult);
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
            _apiResult.IsSuccess = await _certificateService.Update(model);
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Cập nhật chứng chỉ thành công";
                _apiResult.Data = model;
            }
            else
            {
                _apiResult.Message = "Cập nhật chứng chỉ thất bại";
            }
            return Ok(_apiResult);
        }
    }
}
