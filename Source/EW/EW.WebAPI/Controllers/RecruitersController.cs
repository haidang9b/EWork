using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitersController : ControllerBase
    {
        private readonly IRecruiterService _recruiterService;
        private readonly ILogger<RecruitersController> _logger;
        public RecruitersController(IRecruiterService recruiterService, ILogger<RecruitersController> logger)
        {
            _recruiterService = recruiterService;
            _logger = logger;
        }

        [HttpGet("get-companies")]
        public async Task<IActionResult> GetCompanies()
        {
            var result = new ApiResult();
            try
            {
                result.Message = "Lấy dữ liệu thành công";
                result.Data = await _recruiterService.GetCompanies();
            }
            catch(Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        [HttpGet("get-recruiters")]
        public async Task<IActionResult> GetRecruiters()
        {
            var result = new ApiResult();
            try
            {
                result.Message = "Lấy dữ liệu thành công";
                result.Data = await _recruiterService.GetRecruiters();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRecruiterModel model)
        {
            var result = new ApiResult();

            try
            {
                var exist = await _recruiterService.Find(new Company
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                });
                if (exist == null)
                {
                    result.IsSuccess = await _recruiterService.AddNewRecruiter(model);
                    result.Message = "Đăng ký doanh nghiệp thành công, vui lòng chờ xác minh và kiểm tra email";
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Email hoặc số điện thoại này đã được đăng ký";
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPut("update-company-info")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> UpdateCompanyInfo(UpdateCompanyModel model)
        {
            var result = new ApiResult();
            try
            {
                var existCompany = await _recruiterService.GetCompany(new Company { Id = model.Id });
                if(existCompany == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không tồn tại công ty này";
                }
                else
                {
                    if(await _recruiterService.UpdateInformationCompany(model))
                    {
                        result.IsSuccess = true;
                        result.Message = "Cập nhật thông tin thành công";
                        result.Data = await _recruiterService.GetCompany(new Company { Id = model.Id });
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Cập nhật thông tin thất bại";
                    }
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
