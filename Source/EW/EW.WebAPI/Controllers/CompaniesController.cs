using AutoMapper;
using EW.Commons.Enums;
using EW.Commons.Exceptions;
using EW.Commons.Helpers;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.MessageSender;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Companies;
using EW.WebAPI.Models.Models.Emails;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ICompanyService _companyService;
        private readonly IRecruitmentPostService _recruitmentPostService;
        private readonly IRabbitMQMessageSender _rabbitMQMessageSender;
        private readonly CustomConfig _customConfig;
        private readonly IMapper _mapper;
        private readonly ApiResult _apiResult;

        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

        public CompaniesController(
            IUserService userService,
            ICompanyService companyService,
            IRecruitmentPostService recruitmentPostService,
            IRabbitMQMessageSender rabbitMQMessageSender,
            IOptions<CustomConfig> customConfig,
            IMapper mapper)
        {
            _userService = userService;
            _companyService = companyService;
            _recruitmentPostService = recruitmentPostService;
            _rabbitMQMessageSender = rabbitMQMessageSender;
            _customConfig = customConfig.Value;
            _mapper = mapper;
            _apiResult = new();
        }

        /// <summary>
        /// Get all list company
        /// </summary>
        /// <returns>Data list of company in system</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _apiResult.Message = "Lấy dữ liệu thành công";
            _apiResult.Data = await _companyService.GetCompanies();

            return Ok(_apiResult);
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
            var currentUser = await _userService.GetUser(new User { Username = Username });

            var existCompany = await _companyService.GetCompany(new Company { Id = model.Id });
            var currentStatus = existCompany.Status;
            if (existCompany is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không tồn tại công ty này";
            }
            else
            {
                if (await _companyService.UpdateInformationCompany(model))
                {
                    _apiResult.IsSuccess = true;
                    _apiResult.Message = "Cập nhật thông tin thành công";
                    _apiResult.Data = await _companyService.GetCompany(new Company { Id = model.Id });

                    if (currentUser.RoleId == (long)ERole.ID_Faculty && currentStatus != model.Status && model.Status != EStatusRecruiter.Pending)
                    {

                        var changeStatusMessage = new ChangeStatusCompanyMessage
                        {
                            CompanyName = existCompany.CompanyName,
                            FromStatus = currentStatus.Description()!,
                            ToStatus = model.Status.Description()!,
                            URL = _customConfig.FrontEndURL,
                            ToEmail = existCompany.Email
                        };

                        _rabbitMQMessageSender.SendMessage(changeStatusMessage, "DirectChangeStatusCompanyQueueName");
                        _apiResult.Message = "Cập nhật thông tin thành công và đã gửi mail về công ty";
                    }
                }
                else
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Cập nhật thông tin thất bại";
                }
            }

            return Ok(_apiResult);
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

            var exist = await _companyService.GetCompany(new Company
            {
                Email = model.Email,
            });
            if (exist is not null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Email này đã được sử dụng";
                return Ok(_apiResult);
            }
            var newCompany = _mapper.Map<Company>(model);
            var data = await _companyService.AddCompany(newCompany);
            if (data is not null)
            {
                _apiResult.Message = "Thêm công ty thành công ";
                _apiResult.Data = data;
                _apiResult.IsSuccess = true;
            }
            else
            {
                _apiResult.Message = "Thêm công ty thất bại";
                _apiResult.IsSuccess = false;
            }
            return Ok(_apiResult);
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
            var existUser = await _userService.GetUser(new User { Username = Username });

            _apiResult.Data = await _companyService.GetCompanyByUser(existUser);
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }

        /// <summary>
        /// Get top companies with number jobs hiring
        /// </summary>
        /// <returns>List companies have number jobs hiring...</returns>
        [HttpGet("top-companies")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTopCompanies()
        {
            _apiResult.Data = await _companyService.GetTopCompanies();

            return Ok(_apiResult);
        }

        /// <summary>
        /// Get company by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Company or null</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var existCompany = await _companyService.GetCompany(new Company { Id = id })
                                ?? throw new EWException("Không tồn tại công ty này");

            var recruitmentPosts = await _recruitmentPostService.GetRecruitmentPostsByCompany(existCompany);

            _apiResult.Data = new CompanyDetailViewModel
            {
                Id = existCompany.Id,
                CompanyName = existCompany.CompanyName,
                CompanyType = existCompany.CompanyType,
                PhoneNumber = existCompany.PhoneNumber,
                Email = existCompany.Email,
                Address = existCompany.Address,
                AvatarUrl = existCompany.AvatarUrl,
                Country = existCompany.Country,
                TeamSize = existCompany.TeamSize,
                Description = existCompany.Description,
                Posts = recruitmentPosts.OrderByDescending(item => item.CreatedDate).Select(post => new RecruitmentPostShortViewModel
                {
                    Id = post.Id,
                    JobTitle = post.JobTitle,
                    SalaryType = post.SalaryType,
                    SalaryFrom = post.SalaryFrom,
                    SalaryTo = post.SalaryTo,
                    Currency = post.Currency,
                    TechStacks = post.TechStacks,
                    YearExperience = post.YearExperience,
                    JobDescription = post.JobDescription,
                    UpdatedDate = post.UpdatedDate,
                    AvatarUrl = existCompany.AvatarUrl,
                    WorkingType = post.WorkingType,
                    CompanyType = existCompany.CompanyType,
                    CompanyName = existCompany.CompanyName
                }).ToList(),
            };
            _apiResult.IsSuccess = true;
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }
    }
}
