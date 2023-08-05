using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EW.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ApiResult _apiResult;

    public UsersController(
        IUserService userService
    )
    {
        _userService = userService;
        _apiResult = new();
    }
    // GET: api/<UsersController>
    [Authorize(Roles = "Faculty")]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await _userService.GetUsers();
        _apiResult.Data = data.OrderByDescending(item => item.CreatedDate);

        return Ok(_apiResult);
    }

    [HttpPost("add-account-faculty")]
    [Authorize(Roles = "Faculty")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
        if (exist is not null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Tài khoản này đã tồn tại";
        }
        else
        {
            _apiResult.IsSuccess = await _userService.Register(new User
            {
                Email = model.Email,
                Username = model.Username,
                Password = model.Password,
                PhoneNumber = model.NumberPhone,
                FullName = model.FullName,
                RoleId = (long)ERole.ID_Faculty,
            });
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Thêm tài khoản thành công";
                _apiResult.Data = await _userService.GetUser(new User
                {
                    Email = model.Email,
                    Username = model.Username,
                    Password = model.Password,
                    PhoneNumber = model.NumberPhone,
                    FullName = model.FullName,
                });
            }
            else
            {
                _apiResult.Message = "Không thể thêm tài khoản này";
            }
        }

        return Ok(_apiResult);
    }

    [HttpGet("roles")]
    [Authorize(Roles = "Faculty")]
    public async Task<IActionResult> GetRoles()
    {
        _apiResult.Data = await _userService.GetRoles();
        _apiResult.IsSuccess = true;
        _apiResult.Message = "Lấy các quyền thành công";

        return Ok(_apiResult);
    }

    [HttpPut("set-active")]
    [Authorize(Roles = "Faculty")]
    public async Task<IActionResult> SetActive(UserActiveModel model)
    {
        var userExist = await _userService.GetUser(new User { Id = model.Id, Username = model.Username });
        if (userExist is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Tài khoản này không tồn tại";
        }
        else if (userExist.IsActive == model.IsActive)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Không thể thay đổi trạng thái giống như trạng thái cũ";
        }
        else
        {
            userExist.IsActive = model.IsActive;
            _apiResult.IsSuccess = await _userService.UpdateUser(userExist);
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Cập nhật trạng thái tài khoản thành công";
                _apiResult.Data = userExist;
            }
            else
            {
                _apiResult.Message = "Cập nhật trạng thái tài khoản thất bại";
            }
        }

        return Ok(_apiResult);
    }

    [HttpPut("update-account/{id}")]
    [Authorize(Roles = "Faculty")]
    public async Task<IActionResult> Update(long id, UpdateAccount model)
    {
        var exist = await _userService.GetUser(new User { Id = id });
        if (exist is null)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Tài khoản này không tồn tại";
            return Ok(_apiResult);
        }

        else if (exist.Username != model.Username || exist.Email != model.Email)
        {
            _apiResult.IsSuccess = false;
            _apiResult.Message = "Tài khoản này không tồn tại";
        }
        else
        {
            exist.FullName = model.FullName;
            exist.PhoneNumber = model.NumberPhone;
            exist.UpdatedDate = DateTimeOffset.Now;
            _apiResult.IsSuccess = await _userService.UpdateUser(exist);
            if (_apiResult.IsSuccess)
            {
                _apiResult.Message = "Cập nhật tài khoản thành công";
                _apiResult.IsSuccess = true;
                _apiResult.Data = exist;
            }
            else
            {
                _apiResult.Message = "Cập nhật tài khoản thất bại";
                _apiResult.IsSuccess = false;
            }
        }

        return Ok(_apiResult);
    }

}
