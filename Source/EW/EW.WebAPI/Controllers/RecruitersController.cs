using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ICompanyService _companyService;
        private readonly ApiResult _apiResult;

        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

        public RecruitersController(
            IRecruiterService recruiterService,
            IUserService userService,
            ICompanyService companyService
        )
        {
            _recruiterService = recruiterService;
            _userService = userService;
            _companyService = companyService;
            _apiResult = new();
        }

        /// <summary>
        /// Get recruters by role user request
        /// when user request, system check role is Faculty or business.
        /// if business, get recruiters from compay of account request.
        /// if falcuty, get all recruiters/
        /// </summary>
        /// <returns></returns>
        [HttpGet("get-recruiters")]
        [Authorize(Roles = "Faculty,Business")]
        public async Task<IActionResult> GetRecruiters()
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });
            if (currentUser.RoleId == (long)ERole.ID_Business)
            {
                var currentCompany = await _companyService.GetCompanyByUser(currentUser);
                _apiResult.Data = await _recruiterService.GetRecruitersByCompany(currentCompany);
            }
            else
            {
                _apiResult.Data = await _recruiterService.GetRecruiters();
            }
            _apiResult.Message = "Lấy dữ liệu thành công";
            return Ok(_apiResult);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRecruiterModel model)
        {
            var exist = await _companyService.Find(new Company
            {
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
            });
            _apiResult.IsSuccess = await _recruiterService.AddNewRecruiter(model);
            _apiResult.Message = "Đăng ký doanh nghiệp thành công, vui lòng chờ xác minh và kiểm tra email";

            return Ok(_apiResult);
        }

        /// <summary>
        /// Add new recruiter by Faculty or Business
        /// when user request, system check role is Faculty or business.
        /// if business, get company from account request.
        /// if falcuty, check company from model request and add to model.
        /// </summary>
        /// <param name="AddNewRecruiterAccountModel"></param>
        /// <returns>Data recruiter added</returns>
        [HttpPost("add-new-recruiter")]
        [Authorize(Roles = "Faculty,Business")]
        public async Task<IActionResult> AddNewRecruiter(AddNewRecruiterAccountModel model)
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });
            var existUser = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });

            if (currentUser.RoleId == (long)ERole.ID_Business)
            {
                var currentCompany = await _companyService.GetCompanyByUser(currentUser);
                if (currentCompany is null)
                {
                    _apiResult.Message = "Không tồn tại công ty này, vui lòng chọn công ty khác";
                    _apiResult.IsSuccess = false;

                    return Ok(_apiResult);
                }
                model.CompanyId = currentCompany.Id;
            }
            else
            {
                var existCompany = await _companyService.GetCompany(new Company { Id = model.CompanyId });
                if (existCompany is null)
                {
                    _apiResult.Message = "Không tồn tại công ty này, vui lòng chọn công ty khác";
                    _apiResult.IsSuccess = false;

                    return Ok(_apiResult);
                }
            }
            if (existUser is not null)
            {
                _apiResult.Message = "Username hoặc email này đã tồn tại, vui lòng chọn email khác";
                _apiResult.IsSuccess = false;

                return Ok(_apiResult);
            }

            _apiResult.IsSuccess = await _recruiterService.AssignUserToCompany(model);
            _apiResult.Message = _apiResult.IsSuccess ? "Thêm tài khoản nhân sự thành công" : "Thêm tài khoản nhân sự thất bại";
            if (_apiResult.IsSuccess)
            {
                _apiResult.Data = await _recruiterService.GetRecruiterByUser(new User { Username = model.Username, Email = model.Email });
            }

            return Ok(_apiResult);
        }
    }
}
