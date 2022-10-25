using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthController> _logger;
        private List<string> _histRefreshTokens;
        public AuthController(IUserService userService, ITokenService tokenService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _tokenService = tokenService;
            _logger = logger;
            _histRefreshTokens = new List<string>();
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var result = new ApiResult();
            try
            {
                var exit = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                if (exit != null)
                {
                    result.IsSuccess = false;
                    result.Message = "User is exist in System";
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
                    });
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = new ApiResult();
            try
            {
                var exit = await _userService.GetUser(new User { Username = model.Username });
                if (exit != null && BCrypt.Net.BCrypt.Verify(model.Password, exit.Password))
                {
                    result.Message = "Login is successfully";
                    var rfToken = _tokenService.CreateRefreshToken(exit);
                    _histRefreshTokens.Add(rfToken);
                    var data = new LoginViewModel
                    {
                        AccessToken = _tokenService.CreateToken(exit),
                        RefreshToken = rfToken,
                        User = exit,
                    };
                    result.Data = data;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Username or password is incorrect";
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("RefreshToken")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken(string refreshToken)
        {
            var result = new ApiResult();
            try
            {
                var validate = _tokenService.GetPayloadRefreshToken(refreshToken);
                var exist = await _userService.GetUser(new User
                {
                    Email = validate.Issuer,
                    Username = validate.Issuer,
                });

                var token = _tokenService.CreateToken(exist);
                var rfToken = _tokenService.CreateRefreshToken(exist);
                _histRefreshTokens.Remove(refreshToken);
                _histRefreshTokens.Add(rfToken);
                result.Data = new LoginViewModel
                {
                    AccessToken = token,
                    RefreshToken = rfToken,
                    User = exist
                };
                
            }
            catch (Exception e)
            {
                result.InternalError();
                _logger.LogError(e.Message);
            }
            return Ok(result);
        }

        [HttpGet("users")]
        [Authorize(Roles ="Faculty")]
        public async Task<IActionResult> Users()
        {
            var result = new ApiResult();
            try {
                result.Data = await _userService.GetUsers();
            }
            catch (Exception e)
            {
                result.InternalError();
                _logger.LogError(e.Message);
            }
            return Ok(result);
        }
    }
}
