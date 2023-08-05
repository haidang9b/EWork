using AutoMapper;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly IProfileSerivce _profileSerivce;
    private readonly IProjectService _projectService;
    private readonly IMapper _mapper;
    private readonly ApiResult _apiResult;

    private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

    public ProjectsController(
        IProfileSerivce profileSerivce,
        IProjectService projectService,
        IMapper mapper
    )
    {
        _profileSerivce = profileSerivce;
        _projectService = projectService;
        _mapper = mapper;
        _apiResult = new();
    }

    /// <summary>
    /// Add new project
    /// </summary>
    /// <returns></returns>
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<IActionResult> Post(AddProjectModel model)
    {
        var profile = await _profileSerivce.GetProfile(new User { Username = Username });
        if (profile is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Vui lòng get dữ liệu trước khi update";
            return Ok(_apiResult);
        }
        var newProject = _mapper.Map<Project>(model);
        newProject.ProfileId = profile.Id;

        var data = await _projectService.Add(newProject);
        if (data is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Không thể thêm dự án này";
            return Ok(_apiResult);
        }
        else
        {
            _apiResult.IsSuccess = true;
            _apiResult.Message = "Thêm dự án thành công";
            _apiResult.Data = data;
        }

        return Ok(_apiResult);
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
        _apiResult.IsSuccess = await _projectService.Delete(new Project { Id = id });
        if (_apiResult.IsSuccess)
        {
            _apiResult.Message = "Xóa dự án thành công";
            _apiResult.Data = new Project { Id = id };
        }
        else
        {
            _apiResult.Message = "Xóa dự án thất bại";
        }

        return Ok(_apiResult);
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
        _apiResult.IsSuccess = await _projectService.Update(model);
        if (_apiResult.IsSuccess)
        {
            _apiResult.Message = "Cập nhật dự án thành công";
            _apiResult.Data = model;
        }
        else
        {
            _apiResult.Message = "Cập nhật dự án thất bại";
        }

        return Ok(_apiResult);
    }
}
