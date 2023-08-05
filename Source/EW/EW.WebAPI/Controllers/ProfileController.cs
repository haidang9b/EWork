using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IUserCVService _userCVService;
    private readonly IProfileSerivce _profileSerivce;
    private readonly ApiResult _apiResult;

    private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;

    public ProfileController(
        IUserService userService,
        IUserCVService userCVService,
        IProfileSerivce profileSerivce
    )
    {
        _userService = userService;
        _userCVService = userCVService;
        _profileSerivce = profileSerivce;
        _apiResult = new();
    }


    /// <summary>
    /// Get profile user request, role: student
    /// </summary>
    /// <returns></returns>
    [Authorize(Roles = "Student")]
    [HttpGet("my-information")]
    public async Task<IActionResult> MyInformation()
    {
        var profile = await _profileSerivce.GetProfile(new User { Username = Username });
        if (profile is null)
        {
            var initProfile = await _profileSerivce.InitProfile(new User { Username = Username });
            _apiResult.IsSuccess = true;
            _apiResult.Message = "Lấy dữ liệu thành công";
            _apiResult.Data = initProfile;
        }
        else
        {
            _apiResult.IsSuccess = true;
            _apiResult.Message = "Lấy dữ liệu thành công";
            _apiResult.Data = profile;
        }

        return Ok(_apiResult);
    }

    /// <summary>
    /// Update data contact and objective of student request
    /// </summary>
    /// <param name="ContactModel">model</param>
    /// <returns>data updated</returns>
    [Authorize(Roles = "Student")]
    [HttpPut("contact")]
    public async Task<IActionResult> EditContact(ContactModel model)
    {
        var profile = await _profileSerivce.GetProfile(new User { Username = Username });
        if (profile is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Vui lòng get dữ liệu trước khi update";

            return Ok(_apiResult);
        }
        profile.EmailContact = model.EmailContact;
        profile.PhoneNumber = model.PhoneNumber;
        profile.Github = model.Github;
        profile.Linkedin = model.Linkedin;
        profile.Address = model.Address;
        profile.Objective = model.Objective;
        profile.Skills = model.Skills;
        _apiResult.IsSuccess = await _profileSerivce.UpdateProfile(profile);
        if (_apiResult.IsSuccess)
        {
            _apiResult.Data = profile;
            _apiResult.Message = "Cập nhật thông tin thành công";
        }
        else
        {
            _apiResult.Message = "Cập nhật thông tin thất bại";
        }

        return Ok(_apiResult);
    }
    /// <summary>
    /// Turn on or turn off status open for work 
    /// </summary>
    /// <param name="model">UpdateStatusModel</param>
    /// <returns></returns>
    [Authorize(Roles = "Student")]
    [HttpPut("change-status-open-for-work")]
    public async Task<IActionResult> UpdateStatusOpenForWork(UpdateStatusModel model)
    {
        var currrentUser = await _userService.GetUser(new User { Username = Username });
        var profile = await _profileSerivce.GetProfile(new User { Username = Username });
        if (profile is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Vui lòng get dữ liệu trước khi update";
            return Ok(_apiResult);
        }

        if (string.IsNullOrEmpty(profile.PhoneNumber)
            || string.IsNullOrEmpty(profile.Objective)
            || string.IsNullOrEmpty(profile.Skills))
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Bạn vui lòng điền đầy đủ thông tin trước khi bật tìm kiếm việc làm";

            return Ok(_apiResult);
        }
        var cvsOfUser = await _userCVService.GetUserCVsByUser(currrentUser);
        if (!cvsOfUser.Any(item => item.Featured))
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Bạn vui lòng chọn CV chính để bật tìm việc tại quản lý CV";

            return Ok(_apiResult);
        }
        profile.IsOpenForWork = model.IsOpenForWork;
        _apiResult.IsSuccess = await _profileSerivce.UpdateProfile(profile);
        if (_apiResult.IsSuccess)
        {
            _apiResult.Data = profile;
            _apiResult.Message = model.IsOpenForWork ? "Bật tìm kiếm việc thành công" : "Tắt tìm kiếm việc thành công";
        }
        else
        {
            _apiResult.Message = model.IsOpenForWork ? "Bật tìm kiếm việc thất bại" : "Tắt tìm kiếm việc thất bại";
        }

        return Ok(_apiResult);
    }
    /// <summary>
    /// Get all profile is turning on open for work
    /// </summary>
    /// <returns></returns>
    [HttpGet("get-candidates-open-for-work")]
    [AllowAnonymous]
    public async Task<IActionResult> GetCandidateOpenForWork()
    {
        _apiResult.Data = await _profileSerivce.GetProfileOpenForWorks();
        _apiResult.IsSuccess = true;
        _apiResult.Message = "Lấy dữ liệu thành công";

        return Ok(_apiResult);
    }
}
