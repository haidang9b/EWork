using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.Models.Recruiters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitersController : ControllerBase
    {
        private readonly IRecruiterService _recruiterService;
        private readonly IUserService _userService;
        private readonly ILogger<RecruitersController> _logger;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
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
        [Authorize(Roles = "Faculty,Business")]
        public async Task<IActionResult> GetRecruiters()
        {
            var result = new ApiResult();
            try
            {
                // when user request, system check role is Faculty or business
                // if business, get recruiters from compay of account request
                // if falcuty, get all recruiters
                var currentUser = await _userService.GetUser(new User { Username = _username });
                if (currentUser.RoleId == (long)ERole.ID_Business)
                {
                    var currentCompany = await _recruiterService.GetCompanyByUser(currentUser);
                    result.Data = await _recruiterService.GetRecruitersByCompany(currentCompany);
                }
                else
                {
                    result.Data = await _recruiterService.GetRecruiters();
                }
                result.Message = "Lấy dữ liệu thành công";
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
        [Authorize(Roles = "Faculty,Business")]
        public async Task<IActionResult> UpdateCompanyInfo(UpdateCompanyModel model)
        {
            var result = new ApiResult();
            try
            {
                var existCompany = await _recruiterService.GetCompany(new Company { Id = model.Id });
                if (existCompany == null)
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
                var newCompany = new Company
                {
                    CompanyName = model.CompanyName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address,
                    TaxNumber = model.TaxNumber,
                };
                result.IsSuccess = await _recruiterService.AddCompany(newCompany);
                result.Message = result.IsSuccess ? "Thêm công ty thành công " : "Thêm công ty thất bại";
                if (result.IsSuccess)
                {
                    result.Data = await _recruiterService.GetCompany(newCompany);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("add-new-recruiter")]
        [Authorize(Roles = "Faculty,Business")]
        public async  Task<IActionResult> AddNewRecruiter(AddNewRecruiterAccountModel model)
        {
            var result = new ApiResult();
            try
            {
                // when user request, system check role is Faculty or business
                // if business, get company from account request
                // if falcuty, check company from model request and add to model
                var currentUser = await _userService.GetUser(new User { Username = _username });
                var existUser = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });

                if (currentUser.RoleId == (long)ERole.ID_Business)
                {
                    var currentCompany = await _recruiterService.GetCompanyByUser(currentUser);
                    if (currentCompany == null)
                    {
                        result.Message = "Không tồn tại công ty này, vui lòng chọn công ty khác";
                        result.IsSuccess = false;
                        return Ok(result);
                    }
                    model.CompanyId = currentCompany.Id;
                }
                else
                {
                    var existCompany = await _recruiterService.GetCompany(new Company { Id = model.CompanyId });
                    if (existCompany == null)
                    {
                        result.Message = "Không tồn tại công ty này, vui lòng chọn công ty khác";
                        result.IsSuccess = false;
                        return Ok(result);
                    }
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
                    result.Data = await _recruiterService.GetRecruiterByUser(new User { Username = model.Username, Email = model.Email });
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpGet("get-my-company-information")]
        [Authorize(Roles = "Business")]
        public async Task<IActionResult> GetCompanyInformation()
        {
            var result = new ApiResult();
            try
            {
                var existUser = await _userService.GetUser(new User { Username = _username });
                result.Data = await _recruiterService.GetCompanyByUser(existUser);
                result.Message = "Lấy dữ liệu thành công";
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
