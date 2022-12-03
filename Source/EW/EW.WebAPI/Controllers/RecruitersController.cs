using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.Models.Recruiters;
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
        private readonly IUserService _userService;
        private readonly ILogger<RecruitersController> _logger;
        public RecruitersController(IRecruiterService recruiterService, IUserService userService, ILogger<RecruitersController> logger)
        {
            _recruiterService = recruiterService;
            _userService = userService;
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

        [HttpPost("add-new-company")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> AddNewCompanyByFaculty(AddCompanyModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _recruiterService.GetCompany(new Company
                {
                    Email = model.Email,
                });
                if(exist != null)
                {
                    result.IsSuccess = false;
                    result.Message = "Email này đã được sử dụng";
                    return Ok(result);
                }
                result.IsSuccess = await _recruiterService.AddCompany(new Company
                {
                    CompanyName = model.CompanyName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address,
                });
                result.Message = result.IsSuccess ? "Thêm công ty thành công " : "Thêm công ty thất bại";
                if (result.IsSuccess)
                {
                    result.Data = await _recruiterService.GetCompany(new Company
                    {
                        CompanyName = model.CompanyName,
                        Email = model.Email,
                        PhoneNumber = model.PhoneNumber,
                        Address = model.Address,
                    });
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("add-new-recruiter-by-faculty")]
        [Authorize(Roles = "Faculty")]
        public async  Task<IActionResult> AddNewRecruiterByFaculty(AddNewRecruiterAccountModel model)
        {
            var result = new ApiResult();
            try
            {
                var existUser = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                var existCompany = await _recruiterService.GetCompany(new Company { Id = model.CompanyId });
                if(existCompany == null)
                {
                    result.Message = "Không tồn tại công ty này, vui lòng chọn công ty khác";
                    result.IsSuccess = false;
                    return Ok(result);
                }
                if (existUser != null)
                {
                    result.Message = "Username hoặc email này đã tồn tại, vui lòng chọn email khác";
                    result.IsSuccess = false;
                    return Ok(result);
                }

                result.IsSuccess = await _recruiterService.AssignUserToCompany(model);
                result.Message = result.IsSuccess ? "Thêm tài khoản nhân sự thành công" : "Thêm tài khoản nhân sự thất bại";
                if(result.IsSuccess)
                {
                    result.Data = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
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
