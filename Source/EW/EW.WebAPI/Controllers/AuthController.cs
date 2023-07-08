using AutoMapper;
using EW.Commons.Enums;
using EW.Commons.Exceptions;
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
        private readonly IMapper _mapper;

        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        private readonly ApiResult _apiResult;
        public AuthController(IUserService userService, ITokenService tokenService, ILogger<AuthController> logger, IEmailService emailService, ICompanyService companyService, IOptions<CustomConfig> customConfig, IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _companyService = companyService;
            _emailService = emailService;
            _logger = logger;
            _customConfig = customConfig;
            _mapper = mapper;
            _apiResult = new ApiResult();
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var _apiResult = new ApiResult();

            var newUser = _mapper.Map<User>(model);
            _apiResult.IsSuccess = await _userService.Register(newUser);

            return Ok(_apiResult);
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var _apiResult = new ApiResult();
            try
            {
                var exist = await _userService.GetUser(new User { Username = model.Username });
                if (exist is not null && BCrypt.Net.BCrypt.Verify(model.Password, exist.Password))
                {

                    if (exist.RoleId == (long)ERole.ID_Business)
                    {
                        var company = await _companyService.GetCompanyByUser(new User { Id = exist.Id });
                        if (company is not null && company.Status == EStatusRecruiter.Pending)
                        {
                            throw new EWException("Công ti của bạn đã được đăng ký, đang trong thời gian chờ xét");
                        }

                        if (company is not null && company.Status == EStatusRecruiter.Disabled)
                        {
                            throw new EWException("Công ti của bạn đã bị vô hiệu hóa, vui lòng liên hệ Phòng khoa để mở lại");
                        }

                        if (company is null)
                        {
                            throw new EWException("Tài khoản đang không gắn với công ti nào");
                        }
                    }
                    if (!exist.IsActive)
                    {
                        throw new EWException("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
                    }
                    _apiResult.Message = "Đăng nhập thành công";
                    var rfToken = _tokenService.CreateRefreshToken(exist);
                    var data = new LoginViewModel
                    {
                        AccessToken = _tokenService.CreateToken(exist),
                        RefreshToken = rfToken,
                    };
                    _apiResult.Data = data;
                }
                else
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Tài khoản hoặc mật khẩu không chính xác";
                }
            }
            catch (Exception error)
            {
                _logger.LogError(error.Message);
                _apiResult.InternalError(error.Message);
            }
            return Ok(_apiResult);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenModel model)
        {

            var refreshToken = model.RefreshToken;
            var validate = _tokenService.GetPayloadRefreshToken(refreshToken);
            var exist = await _userService.GetUser(new User
            {
                Email = validate.Issuer,
                Username = validate.Issuer,
            });
            if (!exist.IsActive)
            {
                throw new EWException("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
            }
            var token = _tokenService.CreateToken(exist);
            var rfToken = _tokenService.CreateRefreshToken(exist);
            _apiResult.Data = new LoginViewModel
            {
                AccessToken = token,
                RefreshToken = rfToken,
            };


            return Ok(_apiResult);
        }

        [HttpGet("users")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> Users()
        {

            _apiResult.Data = await _userService.GetUsers();

            return Ok(_apiResult);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUsersById(int id)
        {

            _apiResult.Data = await _userService.GetUser(new User { Id = id });


            return Ok(_apiResult);
        }

        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle(LoginWithGoogleModel model)
        {

            var newUser = _mapper.Map<User>(model);
            var resultRegister = await _userService.RegisterWithGoogle(newUser);
            if (!resultRegister)
            {
                throw new EWException("Có lỗi trong quá trình đăng nhập");
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
                _apiResult.Data = data;
                _apiResult.Message = "Đăng nhập thành công";
            }

            return Ok(_apiResult);
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

            var exist = await _userService.GetUser(new User { Username = model.Username, Email = model.Email });
            if (exist is null || exist.Email != model.Email || exist.Username != model.Username)
            {
                throw new EWException("Tài khoản và email này không tại hoặc không chính xác, vui lòng thử lại");
            }
            if (!exist.IsActive)
                throw new EWException("Tài khoản đang bị vô hiệu hóa, vui lòng liên hệ khoa để mở lại");
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
            _apiResult.IsSuccess = true;
            _apiResult.Message = "Khôi phục mật khẩu thành công, vui lòng kiểm tra email";

            return Ok(_apiResult);
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

            var exist = await _userService.GetUser(new User { Username = model.Username });
            if (exist is null || (exist is not null && exist.TokenResetPassword != model.Code))
            {
                throw new EWException("Không tồn tại mã này");
            }
            else
            {
                _apiResult.Message = "OK";
                _apiResult.IsSuccess = true;
            }

            return Ok(_apiResult);
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

            var exist = await _userService.GetUser(new User { Username = model.Username });
            if (exist is null || (exist is not null && exist.TokenResetPassword != model.Code))
            {
                throw new EWException("Không tồn tại mã này");
            }
            else
            {
                exist.Password = model.Password;
                _apiResult.Message = "Khôi phục tài khoản thành công";
                _apiResult.IsSuccess = await _userService.ResetPassword(exist);
            }

            return Ok(_apiResult);
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

            if (string.IsNullOrWhiteSpace(model.ConfirmPassword) || string.IsNullOrWhiteSpace(model.NewPassword))
            {
                _apiResult.Message = "Mật khẩu không được có khoảng trắng";
                _apiResult.IsSuccess = false;
            }
            else if (model.NewPassword != model.ConfirmPassword)
            {
                _apiResult.Message = "Mật khẩu mới và xác minh mật khẩu không khớp";
                _apiResult.IsSuccess = false;
            }
            else
            {
                var currentUser = await _userService.GetUser(new User { Username = _username });
                if (BCrypt.Net.BCrypt.Verify(model.OldPassword, currentUser.Password))
                {
                    var hashed = BCrypt.Net.BCrypt.HashPassword(model.NewPassword, BCrypt.Net.BCrypt.GenerateSalt(12));
                    currentUser.Password = hashed;
                    _apiResult.IsSuccess = await _userService.UpdateUser(currentUser);
                    if (_apiResult.IsSuccess)
                    {
                        _apiResult.Message = "Cập nhật mật khẩu thành công";
                    }
                    else
                    {
                        _apiResult.Message = "Cập nhật mật khẩu thất bại";
                    }
                }
                else
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Mật khẩu cũ không chính xác, vui lòng kiểm tra lại";
                }
            }

            return Ok(_apiResult);
        }
        [HttpGet("get-user-info")]
        [Authorize]
        public async Task<IActionResult> GetUserInfo()
        {

            var currentUser = await _userService.GetUser(new User { Username = _username });
            _apiResult.IsSuccess = true;
            _apiResult.Data = _mapper.Map<UserInfoViewModel>(currentUser);

            return Ok(_apiResult);
        }
    }
}
