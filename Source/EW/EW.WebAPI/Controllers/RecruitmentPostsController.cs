﻿using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.RecruitmentPosts;
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
        private readonly ILogger<RecruitmentPostsController> _logger;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public RecruitmentPostsController(IRecruitmentPostService recruitmentPostService, IUserService userService, IRecruiterService recruiterService, ILogger<RecruitmentPostsController> logger)
        {
            _recruitmentPostService = recruitmentPostService;
            _userService = userService;
            _recruiterService = recruiterService;
            _logger = logger;
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
        public async Task<IActionResult> Post(AddRecruitmentPostModel model)
        {
            var result = new ApiResult();
            try
            {
                // if user is Business, company Id get from request, else get from user and company (table recruiter)
                var currentUser = await _userService.GetUser(new User { Username = _username });
                var postAdd = new RecruitmentPost { 
                    JobTitle = model.JobTitle, 
                    JobDescription = model.JobDescription, 
                    Salary = model.Salary,
                    Deadline = model.Deadline,
                    CreatedDate = DateTimeOffset.Now,
                    UpdatedDate = DateTimeOffset.Now,
                };
                postAdd.UpdatedBy = currentUser.Id;
                if (currentUser.RoleId == (long)ERole.ID_Business)
                {
                    var recruiter = await _recruiterService.GetRecruiterByUser(currentUser);
                    if(recruiter == null)
                    {
                        result.IsSuccess = false;
                        result.Message = "Bạn không có quyền viết bài cho công ty";
                        return Ok(result);
                    }
                    postAdd.CompanyId = recruiter.Company.Id;
                }
                else
                {
                    var company = await _recruiterService.GetCompany(new Company { Id = model.CompanyId ?? default(long) });
                    if(company == null)
                    {
                        result.IsSuccess = false;
                        result.Message = "Không có công ty này, vui lòng kiểm tra lại";
                        return Ok(result);
                    }
                    postAdd.CompanyId = company.Id;
                }

                result.IsSuccess = await _recruitmentPostService.Add(postAdd);
                if(result.IsSuccess)
                {
                    result.Message = "Thêm bài tuyển dụng thành công";
                    result.Data = await _recruitmentPostService.GetRecruitment(postAdd);
                }
                else
                {
                    result.Message = "Không thể thêm bài tuyển dụng này";
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
