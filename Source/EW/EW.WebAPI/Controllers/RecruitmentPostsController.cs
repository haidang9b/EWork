using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
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
        private readonly ILogger<RecruitmentPostsController> _logger;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public RecruitmentPostsController(IRecruitmentPostService recruitmentPostService, IUserService userService, ILogger<RecruitmentPostsController> logger)
        {
            _recruitmentPostService = recruitmentPostService;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("/get-recruitment-posts")]
        [Authorize(Roles ="Business,Faculty")]
        public async Task<IActionResult> GetAllPosts()
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
    }
}
