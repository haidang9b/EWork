using AutoMapper;
using EW.Commons.Enums;
using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.RecruitmentPosts;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentPostsController : ControllerBase
    {
        private readonly IRecruitmentPostService _recruitmentPostService;
        private readonly IUserService _userService;
        private readonly IRecruiterService _recruiterService;
        private readonly ICompanyService _companyService;
        private readonly IMapper _mapper;
        private readonly ApiResult _apiResult;

        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        public RecruitmentPostsController(
            IRecruitmentPostService recruitmentPostService,
            IUserService userService,
            IRecruiterService recruiterService,
            ICompanyService companyService,
            IMapper mapper
        )
        {
            _recruitmentPostService = recruitmentPostService;
            _userService = userService;
            _recruiterService = recruiterService;
            _companyService = companyService;
            _mapper = mapper;
            _apiResult = new();
        }

        [HttpGet]
        [Authorize(Roles = "Business,Faculty")]
        public async Task<IActionResult> Index()
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });
            _apiResult.Data = await _recruitmentPostService.GetRecruitmentPostsByUser(currentUser);
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }

        [HttpPost]
        [Authorize(Roles = "Business,Faculty")]
        public async Task<IActionResult> Post(RecruitmentPostModel model)
        {
            var currentUser = await _userService.GetUser(new User { Username = Username });
            if (model.Id == 0)
            {
                // if user is Business, company Id get from request, else get from user and company (table recruiter)
                var postAdd = _mapper.Map<RecruitmentPost>(model);
                postAdd.IsActive = true;
                postAdd.CreatedDate = DateTimeOffset.Now;
                postAdd.UpdatedDate = DateTimeOffset.Now;
                postAdd.UpdatedBy = currentUser.Id;

                if (currentUser.RoleId == (long)ERole.ID_Business)
                {
                    var recruiter = await _recruiterService.GetRecruiterByUser(currentUser);
                    if (recruiter is null)
                    {
                        _apiResult.IsSuccess = false;
                        _apiResult.Message = "Bạn không có quyền viết bài cho công ty";
                        return Ok(_apiResult);
                    }
                    postAdd.CompanyId = recruiter.Company.Id;
                }
                else
                {
                    var company = await _companyService.GetCompany(new Company { Id = model.CompanyId ?? default });
                    if (company is null)
                    {
                        _apiResult.IsSuccess = false;
                        _apiResult.Message = "Không có công ty này, vui lòng kiểm tra lại";
                        return Ok(_apiResult);
                    }
                    postAdd.CompanyId = company.Id;
                }

                var data = await _recruitmentPostService.Add(postAdd);
                if (data is null)
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Không thể thêm bài tuyển dụng này";
                }
                else
                {
                    _apiResult.Message = "Thêm bài tuyển dụng thành công";
                    _apiResult.Data = data;
                }
            }
            else
            {
                var existPost = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.Id });
                if (existPost is null)
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Không có bài viết nào từ yêu cầu này, vui lòng thử lại";
                    return Ok(_apiResult);
                }
                existPost.JobTitle = model.JobTitle;
                existPost.JobDescription = model.JobDescription;
                existPost.Currency = model.Currency;
                existPost.Deadline = model.Deadline;
                existPost.SalaryType = model.SalaryType;
                existPost.SalaryFrom = model.SalaryFrom;
                existPost.SalaryTo = model.SalaryTo;
                existPost.UpdatedBy = currentUser.Id;
                existPost.TechStacks = model.TechStacks;
                existPost.YearExperience = model.YearExperience;
                existPost.WorkingType = model.WorkingType;

                _apiResult.IsSuccess = await _recruitmentPostService.Update(existPost);
                if (_apiResult.IsSuccess)
                {
                    _apiResult.Message = "Cập nhật bài tuyển dụng thành công";
                    _apiResult.Data = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.Id });
                }
                else
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Không thể cập nhật bài tuyển dụng này";
                }
            }
            return Ok(_apiResult);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Business,Faculty")]
        public async Task<IActionResult> Delete(long id)
        {
            var exist = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = id });
            if (exist is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không có bài viết từ ID này";
            }
            else
            {
                _apiResult.IsSuccess = await _recruitmentPostService.Delete(exist);
                _apiResult.Message = _apiResult.IsSuccess ? "Xóa bài viết thành công" : "Xóa bài viết thất bại";
                _apiResult.Data = exist;
            }


            return Ok(_apiResult);
        }

        [HttpGet("get-jobs")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJobs()
        {
            var data = await _recruitmentPostService.GetAll();
            data = data.OrderByDescending(item => item.UpdatedDate).ToList();
            _apiResult.Data = _mapper.Map<IEnumerable<RecruitmentPostShortViewModel>>(data);

            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetail(long id)
        {
            var post = await _recruitmentPostService.GetRecruitmentPostForDetail(new RecruitmentPost { Id = id })
                        ?? throw new EWException("Không có dữ liệu từ id này");
            _apiResult.Data = post;
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
        }
    }
}
