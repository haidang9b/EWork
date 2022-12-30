using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Applications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly ILogger<ApplicationsController> _logger;
        private readonly IUserService _userService;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ApplicationsController(IApplicationService applicationService, ILogger<ApplicationsController> logger, IUserService userService)
        {
            _applicationService = applicationService;
            _logger = logger;
            _userService = userService;
        }

        /// <summary>
        /// Student apply job
        /// </summary>
        /// <param name="model">ApplicationRequestModel</param>
        /// <returns>data object request added</returns>
        [Authorize(Roles ="Student")]
        [HttpPost]
        public async Task<IActionResult> Post(ApplicationRequestModel model)
        {
            var result = new ApiResult();
            try
            {
                var currentUser = await _userService.GetUser(new User { Username = _username });
                result.Data = await _applicationService.Add(new AddApplicationModel
                {
                    RecruitmentPostId = model.RecruitmentPostId,
                    UserCVId = model.UserCVId,
                    UserId = currentUser.Id,
                    CoverLetter = model.CoverLetter,
                });
                result.Message = "Ứng tuyển thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Get applications by username request
        /// </summary>
        /// <returns>Data applications of user</returns>
        [Authorize(Roles = "Student")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _applicationService.GetByApplier(new User
                {
                    Username= _username,
                });

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Get jobs applied of student, system will detect user request and response data
        /// </summary>
        /// <returns>List data jobs applied</returns>
        [Authorize(Roles = "Student")]
        [HttpGet("jobs-applied")]
        public async Task<IActionResult> GetJobsApplied()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _applicationService.GetJobsApplied(new User
                {
                    Username = _username,
                });
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
    }
}
