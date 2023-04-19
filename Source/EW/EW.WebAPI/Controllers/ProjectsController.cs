using EW.Domain.Entities;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EW.Services.Contracts;
using EW.Services.Constracts;
using System.Security.Claims;
using AutoMapper;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IProfileSerivce _profileSerivce;
        private readonly IProjectService _projectService;
        private IMapper _mapper;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public ProjectsController(ILogger<ProfileController> logger, IProfileSerivce profileSerivce, IProjectService projectService, IMapper mapper)
        {
            _logger = logger;
            _profileSerivce = profileSerivce;
            _projectService = projectService;
            _mapper = mapper;
        }

        /// <summary>
        /// Add new project
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPost]
        public async Task<IActionResult> Post(AddProjectModel model)
        {
            var result = new ApiResult();
            try
            {
                var profile = await _profileSerivce.GetProfile(new User { Username = _username });
                if (profile == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Vui lòng get dữ liệu trước khi update";
                    return Ok(result);
                }
                var newProject = _mapper.Map<Project>(model);
                newProject.ProfileId = profile.Id;
                
                var data = await _projectService.Add(newProject);
                if (data == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không thể thêm dự án này";
                    return Ok(result);
                }
                else
                {
                    result.IsSuccess = true;
                    result.Message = "Thêm dự án thành công";
                    result.Data = data;
                }
            }
            catch (Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Remove Project
        /// </summary>
        /// <param name="id">long</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _projectService.Delete(new Project { Id = id });
                if (result.IsSuccess)
                {
                    result.Message = "Xóa dự án thành công";
                    result.Data = new Project { Id = id };
                }
                else
                {
                    result.Message = "Xóa dự án thất bại";
                }
            }
            catch (Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Update Project
        /// </summary>
        /// <param name="model">Project</param>
        /// <returns></returns>
        [Authorize(Roles = "Student")]
        [HttpPut]
        public async Task<IActionResult> Put(Project model)
        {
            var result = new ApiResult();
            try
            {
                result.IsSuccess = await _projectService.Update(model);
                if (result.IsSuccess)
                {
                    result.Message = "Cập nhật dự án thành công";
                    result.Data = model;
                }
                else
                {
                    result.Message = "Cập nhật dự án thất bại";
                }
            }
            catch (Exception ex)
            {
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }
    }
}
