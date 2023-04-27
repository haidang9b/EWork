using AutoMapper;
using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

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
        private readonly IOptions<CustomConfig> _customConfig;
        private readonly ILogger<AuthController> _logger;
        private IMapper _mapper;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        public AuthController(IUserService userService, ITokenService tokenService, ILogger<AuthController> logger, IEmailService emailService, ICompanyService companyService, IOptions<CustomConfig> customConfig, IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _companyService = companyService;
            _emailService = emailService;
            _logger = logger;
            _customConfig = customConfig;
            _mapper = mapper;
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
                    var newUser = _mapper.Map<User>(model);
                    result.IsSuccess = await _userService.Register(newUser);
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
                            throw new Exception("Công ti của bạn đã được đăng ký, đang trong thời gian chờ xét");
                        }

                        if (company != null && company.Status == EStatusRecruiter.Disabled)
                        {
                            throw new Exception("Công ti của bạn đã bị vô hiệu hóa, vui lòng liên hệ Phòng khoa để mở lại");
                        }

                        if (company == null)
                        {
                            throw new Exception("Tài khoản đang không gắn với công ti nào");
                        }
                    }
                    if (!exist.IsActive)
                    {
                        throw new Exception("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
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
                result.InternalError(error.Message);
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
                if(!exist.IsActive)
                {
                    throw new Exception("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
                }
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
                var newUser = _mapper.Map<User>(model);
                var resultRegister = await _userService.RegisterWithGoogle(newUser);
                if(!resultRegister)
                {
                    throw new Exception("Có lỗi trong quá trình đăng nhập");
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
                result.InternalError(ex.Message);
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// This request to generate code and send email reset password
        /// </summary>
        /// <param name="model">RecoveryPasswordModel</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("recovery")]
        public async Task<IActionResult> RecoveryPassword(RecoveryPasswordModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
                if (exist == null || exist.Email != model.Email || exist.Username != model.Username)  
                {
                    throw new Exception("Tài khoản và email này không tại hoặc không chính xác, vui lòng thử lại");
                }
                if(!exist.IsActive)
                    throw new Exception("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
                var body = string.Empty;
                using (StreamReader reader = new StreamReader(Path.Combine("EmailTemplates/RecoveryPassword.html")))
                {
                    body = reader.ReadToEnd();
                }
                var key = await _userService.GenKeyResetPassword(exist);
                var bodyBuilder = new System.Text.StringBuilder(body);
                bodyBuilder.Replace("{username}", exist.FullName);
                bodyBuilder.Replace("{url}", $"{_customConfig.Value.FrontEndURL}/confirm-recover?code={key}&username={exist.Username}");
                var data = new EmailDataModel { Body = bodyBuilder.ToString(), Subject = "[EWork] Khôi phục mật khẩu", ToEmail = exist.Email };
                await _emailService.SendEmail(data);
                result.IsSuccess = true;
                result.Message = "Khôi phục mật khẩu thành công, vui lòng kiểm tra email";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
                result.Message = ex.Message;
            }
            return Ok(result);
        }
        /// <summary>
        /// This password check code reset password is valid or not valid, this step pass then user can using next step
        /// </summary>
        /// <param name="model">ValidateRecoverModel</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("is-valid-code-recover")]
        public async Task<IActionResult> IsValidCodeRecover(ValidateRecoverModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if(exist == null || (exist!= null && exist.TokenResetPassword != model.Code))
                {
                    throw new Exception("Không tồn tại mã này");
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
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        /// <summary>
        /// Reset password with code sent(by email) and access to link, enter password to reset
        /// </summary>
        /// <param name="model">SubmitRecoverModel</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(SubmitRecoverModel model)
        {
            var result = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if (exist == null || (exist != null && exist.TokenResetPassword != model.Code))
                {
                    throw new Exception("Không tồn tại mã này");
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
                result.Message = ex.Message;
                _logger.LogError(ex.Message);
            }
            return Ok(result);
        }
        /// <summary>
        /// Update password from request model
        /// </summary>
        /// <param name="model">UpdatePassword</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordModel model)
        {
            var result = new ApiResult();
            try
            {
                if (string.IsNullOrWhiteSpace(model.ConfirmPassword) || string.IsNullOrWhiteSpace(model.NewPassword))
                {
                    result.Message = "Mật khẩu không được có khoảng trắng";
                    result.IsSuccess = false;
                }
                else if (model.NewPassword != model.ConfirmPassword)
                {
                    result.Message = "Mật khẩu mới và xác minh mật khẩu không khớp";
                    result.IsSuccess = false;
                }
                else
                {
                    var currentUser = await _userService.GetUser(new User { Username = _username });
                    if(BCrypt.Net.BCrypt.Verify(model.OldPassword, currentUser.Password))
                    {
                        var hashed = BCrypt.Net.BCrypt.HashPassword(model.NewPassword, BCrypt.Net.BCrypt.GenerateSalt(12));
                        currentUser.Password = hashed;
                        result.IsSuccess = await _userService.UpdateUser(currentUser);
                        if (result.IsSuccess)
                        {
                            result.Message = "Cập nhật mật khẩu thành công";
                        }
                        else
                        {
                            result.Message = "Cập nhật mật khẩu thất bại";
                        }
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Mật khẩu cũ không chính xác, vui lòng kiểm tra lại";
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }

            return Ok(result);
        }
        [HttpGet("get-user-info")]
        [Authorize]
        public async Task<IActionResult> GetUserInfo()
        {
            var result = new ApiResult();
            try
            {
                var currentUser = await _userService.GetUser(new User { Username = _username });
                result.IsSuccess = true;
                result.Data = _mapper.Map<UserInfoViewModel>(currentUser);
            }
            catch(Exception ex)
            {
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
    }
}
