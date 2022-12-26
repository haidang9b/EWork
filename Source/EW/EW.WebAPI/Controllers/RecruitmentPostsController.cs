using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.RecruitmentPosts;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public RecruitmentPostsController(IRecruitmentPostService recruitmentPostService, IUserService userService, IRecruiterService recruiterService, ILogger<RecruitmentPostsController> logger, ICompanyService companyService)
        {
            _recruitmentPostService = recruitmentPostService;
            _userService = userService;
            _recruiterService = recruiterService;
            _logger = logger;
            _companyService = companyService;
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
                    var postAdd = new RecruitmentPost
                    {
                        JobTitle = model.JobTitle,
                        JobDescription = model.JobDescription,
                        SalaryFrom = model.SalaryFrom,
                        SalaryTo = model.SalaryTo,
                        Currency = model.Currency,
                        Deadline = model.Deadline,
                        CreatedDate = DateTimeOffset.Now,
                        UpdatedDate = DateTimeOffset.Now,
                        SalaryType = model.SalaryType,
                        TechStacks = model.TechStacks,
                        YearExperience = model.YearExperience,
                        WorkingType = model.WorkingType,
                        IsActive = true
                    };
                    postAdd.UpdatedBy = currentUser.Id;
                    if (currentUser.RoleId == (long)ERole.ID_Business)
                    {
                        var recruiter = await _recruiterService.GetRecruiterByUser(currentUser);
                        if (recruiter == null)
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
                        if (company == null)
                        {
                            result.IsSuccess = false;
                            result.Message = "Không có công ty này, vui lòng kiểm tra lại";
                            return Ok(result);
                        }
                        postAdd.CompanyId = company.Id;
                    }

                    result.IsSuccess = await _recruitmentPostService.Add(postAdd);
                    if (result.IsSuccess)
                    {
                        result.Message = "Thêm bài tuyển dụng thành công";
                        result.Data = await _recruitmentPostService.GetRecruitmentSpecific(postAdd);
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Không thể thêm bài tuyển dụng này";
                    }
                }
                else
                {
                    var existPost = await _recruitmentPostService.GetRecruitmentPost(new RecruitmentPost { Id = model.Id });
                    if(existPost == null)
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
                result.InternalError();
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
                if(exist == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không có bài viết từ ID này";
                }
                else
                {
                    result.IsSuccess = await _recruitmentPostService.Delete(exist);
                    result.Message = result.IsSuccess ? "Xóa bài viết thành công" : "Xóa bài viết thất bại";
                    result.Data = result.IsSuccess ? exist : null;
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
                result.Data = data.Select(post => new RecruitmentPostShortViewModel
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
                    AvatarUrl = post.Company.AvatarUrl,
                    WorkingType = post.WorkingType,
                    CompanyType = post.Company.CompanyType,
                    CompanyName = post.Company.CompanyName
                }).ToList();
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
                if(post == null)
                {
                    throw new Exception("Không có dữ liệu từ id này");
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
