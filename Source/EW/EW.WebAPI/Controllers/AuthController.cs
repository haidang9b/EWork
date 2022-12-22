using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly ICompanyService _companyService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(IUserService userService, ITokenService tokenService, ILogger<AuthController> logger, IEmailService emailService, ICompanyService companyService)
        {
            _userService = userService;
            _tokenService = tokenService;
            _companyService = companyService;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                if (exist != null)
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
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if (exist != null && BCrypt.Net.BCrypt.Verify(model.Password, exist.Password))
                {

                    if(exist.RoleId == (long)ERole.ID_Business)
                    {
                        var company = await _companyService.GetCompanyByUser(new User { Id = exist.Id });
                        if (company != null && company.Status == EStatusRecruiter.Pending)
                        {
                            result.IsSuccess = false;
                            result.Message = "Công ti của bạn đã được đăng ký, đang trong thời gian chờ xét";
                            return Ok(result);
                        }

                        if (company != null && company.Status == EStatusRecruiter.Disabled)
                        {
                            result.IsSuccess = false;
                            result.Message = "Công ti của bạn đã bị vô hiệu hóa, vui lòng liên hệ Phòng khoa để mở lại";
                            return Ok(result);
                        }

                        if (company == null)
                        {
                            result.IsSuccess = false;
                            result.Message = "Tài khoản đang không gắn với công ti nào";
                            return Ok(result);
                        }
                    }
                    if (!exist.IsActive)
                    {
                        result.IsSuccess = false;
                        result.Message = "Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại";
                        return Ok(result);
                    }
                    result.Message = "Đăng nhập thành công";
                    var rfToken = _tokenService.CreateRefreshToken(exist);
                    var data = new LoginViewModel
                    {
                        AccessToken = _tokenService.CreateToken(exist),
                        RefreshToken = rfToken,
                    };
                    result.Data = data;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Tài khoản hoặc mật khẩu không chính xác";
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
        public async Task<IActionResult> RefreshToken(RefreshTokenModel model)
        {
            var result = new ApiResult();
            try
            {
                var refreshToken = model.RefreshToken;
                var validate = _tokenService.GetPayloadRefreshToken(refreshToken);
                var exist = await _userService.GetUser(new User
                {
                    Email = validate.Issuer,
                    Username = validate.Issuer,
                });
                var token = _tokenService.CreateToken(exist);
                var rfToken = _tokenService.CreateRefreshToken(exist);
                result.Data = new LoginViewModel
                {
                    AccessToken = token,
                    RefreshToken = rfToken,
                };

            }
            catch (Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
                return Forbid();
            }
            return Ok(result);
        }

        [HttpGet("users")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> Users()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _userService.GetUsers();
            }
            catch (Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUsersById(int id)
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _userService.GetUser(new User { Id = id });
            }
            catch(Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }

            return Ok(result);
        }

        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle(LoginWithGoogleModel model)
        {
            var result = new ApiResult();
            try
            {
                var resultRegister = await _userService.RegisterWithGoogle(new User
                {
                    Username = model.GoogleId,
                    Email = model.Email,
                    FullName = model.FullName,
                    ImageUrl = model.ImageUrl

                });
                if(!resultRegister)
                {
                    result.Message = "Có lỗi trong quá trình đăng nhập";
                    result.IsSuccess = false;
                }
                else
                {
                    var exist = await _userService.GetUser(new User { Username = model.GoogleId, Email = model.Email });
                    var rfToken = _tokenService.CreateRefreshToken(exist);
                    var data = new LoginViewModel
                    {
                        AccessToken = _tokenService.CreateToken(exist),
                        RefreshToken = rfToken,
                    };
                    result.Data = data;
                    result.Message = "Đăng nhập thành công";
                }
                
            }
            catch(Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        [HttpPost("recovery")]
        public async Task<IActionResult> RecoveryPassword(RecoveryPasswordModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                if (exist == null || exist.Email != model.Email || exist.Username != model.Username)  
                {
                    result.Message = "Tài khoản và email này không tại hoặc không chính xác, vui lòng thử lại";
                    result.IsSuccess = false;
                    return Ok(result);
                }
                var body = string.Empty;
                using (StreamReader reader = new StreamReader(Path.Combine("EmailTemplates/RecoveryPassword.html")))
                {

                    body = reader.ReadToEnd();

                }
                var key = await _userService.GenKeyResetPassword(exist);
                var bodyBuilder = new System.Text.StringBuilder(body);
                bodyBuilder.Replace("{username}", exist.FullName);
                bodyBuilder.Replace("{url}", $"http://localhost:3000/confirm-recover?code={key}&username={exist.Username}");
                var data = new EmailDataModel { Body = bodyBuilder.ToString(), Subject = "[EWork] Khôi phục mật khẩu", ToEmail = exist.Email };
                await _emailService.SendEmail(data);
                result.IsSuccess = true;
                result.Message = "Khôi phục mật khẩu thành công, vui lòng kiểm tra email";
            }
            catch(Exception ex)
            {
                result.InternalError();
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpPost("is-valid-code-recover")]
        public async Task<IActionResult> IsValidCodeRecover(ValidateRecoverModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if(exist == null || (exist!= null && exist.TokenResetPassword != model.Code))
                {
                    result.Message = "Không tồn tại mã này";
                    result.IsSuccess = false;
                }
                else
                {
                    result.Message = "OK";
                    result.IsSuccess = true;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(SubmitRecoverModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if (exist == null || (exist != null && exist.TokenResetPassword != model.Code))
                {
                    result.Message = "Không tồn tại mã này";
                    result.IsSuccess = false;
                }
                else
                {
                    exist.Password = model.Password;
                    result.Message = "Khôi phục tài khoản thành công";
                    result.IsSuccess = await _userService.ResetPassword(exist);
                }
            }
            catch(Exception ex)
            {
                result.InternalError();
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }
    }
}
