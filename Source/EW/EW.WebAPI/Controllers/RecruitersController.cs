using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
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
            catch(Exception e)
            {
                result.InternalError();
                _logger.LogError(e.Message);
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
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("register")]
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
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                result.InternalError();
            }
            return Ok(result);
        }
    }
}
