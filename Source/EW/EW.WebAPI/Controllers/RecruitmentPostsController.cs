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
        private readonly ILogger<RecruitmentPostsController> _logger;
        private IMapper _mapper;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public RecruitmentPostsController(IRecruitmentPostService recruitmentPostService, IUserService userService, IRecruiterService recruiterService, ILogger<RecruitmentPostsController> logger, ICompanyService companyService, IMapper mapper)
        {
            _recruitmentPostService = recruitmentPostService;
            _userService = userService;
            _recruiterService = recruiterService;
            _logger = logger;
            _companyService = companyService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles ="Business,Faculty")]
        public async Task<IActionResult> Index()
        {
            var result = new ApiResult();
            try
            {
                var currentUser = await _userService.GetUser(new User { Username = _username });
                result.Data = await _recruitmentPostService.GetRecruitmentPostsByUser(currentUser);
                result.Message = "Lấy dữ liệu thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Business,Faculty")]
        public async Task<IActionResult> Post(RecruitmentPostModel model)
        {
            var result = new ApiResult();
            try
            {
                var currentUser = await _userService.GetUser(new User { Username = _username });
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
                            result.IsSuccess = false;
                            result.Message = "Bạn không có quyền viết bài cho công ty";
                            return Ok(result);
                        }
                        postAdd.CompanyId = recruiter.Company.Id;
                    }
                    else
                    {
                        var company = await _companyService.GetCompany(new Company { Id = model.CompanyId ?? default(long) });
                        if (company is null)
                        {
                            result.IsSuccess = false;
                            result.Message = "Không có công ty này, vui lòng kiểm tra lại";
                            return Ok(result);
                        }
                        postAdd.CompanyId = company.Id;
                    }

                    var data = await _recruitmentPostService.Add(postAdd);
                    if (data is null)
                    {
                        result.IsSuccess = false;
                        result.Message = "Không thể thêm bài tuyển dụng này";
                    }
                    else
                    {
                        result.Message = "Thêm bài tuyển dụng thành công";
                        result.Data = data;
                    }
                }
                else
                {
                    var existPost = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.Id });
                    if(existPost is null)
                    {
                        result.IsSuccess = false;
                        result.Message = "Không có bài viết nào từ yêu cầu này, vui lòng thử lại";
                        return Ok(result);
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

                    result.IsSuccess = await _recruitmentPostService.Update(existPost);
                    if (result.IsSuccess)
                    {
                        result.Message = "Cập nhật bài tuyển dụng thành công";
                        result.Data = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.Id });
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Không thể cập nhật bài tuyển dụng này";
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Business,Faculty")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = id });
                if(exist is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không có bài viết từ ID này";
                }
                else
                {
                    result.IsSuccess = await _recruitmentPostService.Delete(exist);
                    result.Message = result.IsSuccess ? "Xóa bài viết thành công" : "Xóa bài viết thất bại";
                    result.Data = exist;
                }

            }
            catch(Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        [HttpGet("get-jobs")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJobs()
        {
            var result = new ApiResult();
            try
            {
                var data = await _recruitmentPostService.GetAll();
                data = data.OrderByDescending(item => item.UpdatedDate).ToList();
                result.Data = _mapper.Map<IEnumerable<RecruitmentPostShortViewModel>>(data);
                 
                result.Message = "Lấy dữ liệu thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetail(long id)
        {
            var result = new ApiResult();
            try
            {
                var post = await _recruitmentPostService.GetRecruitmentPostForDetail(new RecruitmentPost { Id = id });
                if(post is null)
                {
                    throw new EWException("Không có dữ liệu từ id này");
                }
                result.Data = post;
                result.Message = "Lấy dữ liệu thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
                result.Message = ex.Message;
            }
            return Ok(result);
        }
    }
}
