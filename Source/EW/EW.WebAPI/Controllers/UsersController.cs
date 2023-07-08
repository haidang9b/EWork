using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UsersController> _logger;
        private readonly ITokenService _tokenService;
        public UsersController(IUserService userService, ILogger<UsersController> logger, ITokenService tokenService)
        {
            _userService = userService;
            _logger = logger;
            _tokenService = tokenService;
        }
        // GET: api/<UsersController>
        [Authorize(Roles = "Faculty")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new ApiResult();
            try
            {
                var data = await _userService.GetUsers();
                result.Data = data.OrderByDescending(item => item.CreatedDate);
            }
            catch (Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        [HttpPost("add-account-faculty")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                if (exist is not null)
                {
                    result.IsSuccess = false;
                    result.Message = "Tài khoản này đã tồn tại";
                }
                else
                {
                    result.IsSuccess = await _userService.Register(new User
                    {
                        Email = model.Email,
                        Username = model.Username,
                        Password = model.Password,
                        PhoneNumber = model.NumberPhone,
                        FullName = model.FullName,
                        RoleId = (long)ERole.ID_Faculty,
                    });
                    if (result.IsSuccess)
                    {
                        result.Message = "Thêm tài khoản thành công";
                        result.Data = await _userService.GetUser(new User
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
                        result.Message = "Không thể thêm tài khoản này";
                    }
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpGet("roles")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> GetRoles()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _userService.GetRoles();
                result.IsSuccess = true;
                result.Message = "Lấy các quyền thành công";
            }
            catch(Exception ex)
            {

                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPut("set-active")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> SetActive(UserActiveModel model)
        {
            var result = new ApiResult();
            try
            {
                var userExist = await _userService.GetUser(new User { Id = model.Id, Username = model.Username });
                if(userExist is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Tài khoản này không tồn tại";
                }
                else if(userExist.IsActive == model.IsActive)
                {
                    result.IsSuccess = false;
                    result.Message = "Không thể thay đổi trạng thái giống như trạng thái cũ";
                }
                else
                {
                    userExist.IsActive = model.IsActive;
                    result.IsSuccess = await _userService.UpdateUser(userExist);
                    if (result.IsSuccess)
                    {
                        result.Message = "Cập nhật trạng thái tài khoản thành công";
                        result.Data = userExist;
                    }
                    else
                    {
                        result.Message = "Cập nhật trạng thái tài khoản thất bại";
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

        [HttpPut("update-account/{id}")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> Update(long id, UpdateAccount model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Id = id });
                if (exist is null || (exist is not null && (exist.Username != model.Username || exist.Email != model.Email)))
                {
                    result.IsSuccess = false;
                    result.Message = "Tài khoản này không tồn tại";
                }
                else
                {
                    exist.FullName = model.FullName;
                    exist.PhoneNumber = model.NumberPhone;
                    exist.UpdatedDate = DateTimeOffset.Now;
                    result.IsSuccess = await _userService.UpdateUser(exist);
                    if(result.IsSuccess)
                    {
                        result.Message = "Cập nhật tài khoản thành công";
                        result.IsSuccess = true;
                        result.Data = exist;
                    }
                    else
                    {
                        result.Message = "Cập nhật tài khoản thất bại";
                        result.IsSuccess = false;
                    }
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /*[HttpPut("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordModel model)
        {
            var result = new ApiResult();
            try
            {

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }

            return Ok(result);
        }*/
    }
}
