using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Companies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRecruiterService _recruiterService;
        private readonly IUserService _userService;
        private readonly ICompanyService _companyService;
        private readonly ILogger<RecruitersController> _logger;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public CompaniesController(IRecruiterService recruiterService, IUserService userService, ICompanyService companyService, ILogger<RecruitersController> logger)
        {
            _recruiterService = recruiterService;
            _userService = userService;
            _companyService = companyService;
            _logger = logger;
        }

        /// <summary>
        /// Get all list company
        /// </summary>
        /// <returns>Data list of company in system</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new ApiResult();
            try
            {
                result.Message = "Lấy dữ liệu thành công";
                result.Data = await _companyService.GetCompanies();
            }
            catch (Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Edit information of company by Faculty and Business
        /// Faculty need enter id edit, Business will detect id by user request
        /// </summary>
        /// <param name="UpdateCompanyModel"></param>
        /// <returns>Data of company updated</returns>
        [HttpPut]
        [Authorize(Roles = "Faculty,Business")]
        public async Task<IActionResult> Put(UpdateCompanyModel model)
        {
            var result = new ApiResult();
            try
            {
                var existCompany = await _companyService.GetCompany(new Company { Id = model.Id });
                if (existCompany == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không tồn tại công ty này";
                }
                else
                {
                    if (await _companyService.UpdateInformationCompany(model))
                    {
                        result.IsSuccess = true;
                        result.Message = "Cập nhật thông tin thành công";
                        result.Data = await _companyService.GetCompany(new Company { Id = model.Id });
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Cập nhật thông tin thất bại";
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Add new Company by role Faculty
        /// </summary>
        /// <param name="AddCompanyModel"></param>
        /// <returns>Data new company</returns>
        [HttpPost]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> Post(AddCompanyModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _companyService.GetCompany(new Company
                {
                    Email = model.Email,
                });
                if (exist != null)
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
                result.IsSuccess = await _companyService.AddCompany(newCompany);
                result.Message = result.IsSuccess ? "Thêm công ty thành công " : "Thêm công ty thất bại";
                if (result.IsSuccess)
                {
                    result.Data = await _companyService.GetCompany(newCompany);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Get information details of company by Business
        /// System will detect company of user request and return information company's user requesst
        /// </summary>
        /// <returns>Data of user request</returns>
        [HttpGet("get-my-company-information")]
        [Authorize(Roles = "Business")]
        public async Task<IActionResult> Profile()
        {
            var result = new ApiResult();
            try
            {
                var existUser = await _userService.GetUser(new User { Username = _username });
                result.Data = await _companyService.GetCompanyByUser(existUser);
                result.Message = "Lấy dữ liệu thành công";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpGet("top-companies")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTopCompanies()
        {
            var result = new ApiResult();
            try
            {

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
