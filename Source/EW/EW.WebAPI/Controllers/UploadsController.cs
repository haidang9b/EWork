using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.ViewModels;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Uploads;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly ILogger<UploadsController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUserService _userService;
        private readonly IUserCVService _userCVService;
        private readonly ICompanyService _companyService;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        private readonly ApiResult _apiResult;

        public UploadsController(
            ILogger<UploadsController> logger,
            IWebHostEnvironment webHostEnvironment,
            IUserService userService,
            IUserCVService userCVService,
            ICompanyService companyService
        )
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _userService = userService;
            _userCVService = userCVService;
            _companyService = companyService;
            _apiResult = new();
        }

        /// <summary>
        /// Student upload new cv to CV collection
        /// </summary>
        /// <param name="UploadNewCVModel"></param>
        /// <returns>Data cv newest upload of user</returns>
        [Authorize(Roles = "Student")]
        [HttpPost("upload-new-cv")]
        public async Task<IActionResult> UploadNewCV([FromForm] UploadNewCVModel model)
        {

            var fileExtension = Path.GetExtension(model.File.FileName);
            var acceptExtensionFiles = new string[] { ".docx", ".doc", ".pdf" };
            var fileNameRequest = model.File.FileName;
            if (!acceptExtensionFiles.Contains(fileExtension))
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Loại file này không được chấp nhận";

                return Ok(_apiResult);
            }
            if (model.File.Length > 10000000)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "File lớn hơn 10MB, không thể upload";
                return Ok(_apiResult);
            }

            var uploadModel = new ImportFileModel { File = model.File, Type = EFileType.CV };
            var resultUpload = await WriteFile(uploadModel);
            var user = await _userService.GetUser(new User { Username = Username });

            if (resultUpload.IsSuccess)
            {
                var ownerCV = new UserCV
                {
                    CVUrl = resultUpload.Path,
                    CVName = fileNameRequest,
                    UserId = user.Id,
                    Featured = false,
                };

                var resultAddCV = await _userCVService.AddCV(ownerCV);
                if (resultAddCV is not null)
                {
                    _apiResult.IsSuccess = true;
                    _apiResult.Message = "Upload cv thành công";
                    _apiResult.Data = resultAddCV;
                }
                else
                {
                    _apiResult.IsSuccess = false;
                    _apiResult.Message = "Không thể upload cv này lên";
                }

            }
            else
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không thể upload cv này lên";
            }


            return Ok(_apiResult);
        }

        /// <summary>
        /// upload new avatar for company by business role
        /// </summary>
        /// <param name="UploadAvatarModel"></param>
        /// <returns>Information data user updated</returns>
        [Authorize(Roles = "Business")]
        [HttpPost("upload-avatar-company")]
        public async Task<IActionResult> UploadAvatarCompany([FromForm] UploadAvatarModel model)
        {

            var user = await _userService.GetUser(new User { Username = Username });
            var companyByUser = await _companyService.GetCompanyByUser(user);
            var fileExtension = Path.GetExtension(model.File.FileName).ToLower();
            var acceptExtensionFiles = new string[] { ".jpg", ".jpeg", ".apng", ".png", ".svg", ".webp" };

            if (!acceptExtensionFiles.Contains(fileExtension))
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không thể upload hình ảnh này lên";
                return Ok(_apiResult);
            }

            var uploadModel = new ImportFileModel { File = model.File, Type = EFileType.CompanyAvatar };
            var resultUpload = await WriteFile(uploadModel);
            if (resultUpload.IsSuccess)
            {
                companyByUser.AvatarUrl = resultUpload.Path;
                _apiResult.IsSuccess = await _companyService.UploadAvatarCompany(companyByUser);
                _apiResult.Message = _apiResult.IsSuccess ? "Upload hình ảnh thành công" : "Không thể upload hình ảnh này lên";
                if (resultUpload.IsSuccess)
                {
                    _apiResult.Data = companyByUser;
                }
            }
            else
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không thể upload hình ảnh này lên";
            }

            return Ok(_apiResult);
        }


        /// <summary>
        /// Write file to folder /Uploads. File name have information like: type upload, Date time upload, filename
        /// </summary>
        /// <param name="ImportFileModel">model</param>
        /// <returns>ResponseWriteFile { IsSuccess: bool, Path: string}</returns>
        [NonAction]
        private async Task<ResponseWriteFile> WriteFile(ImportFileModel model)
        {
            var response = new ResponseWriteFile();
            try
            {
                var folder = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads");

                var fileName = $"{model.Type}_{DateTime.Now:yyyyMMddHHmmss}_{model.File.FileName}";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                if (model.File is not null && model.File.Length > 0)
                {
                    string filePath = Path.Combine(folder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.File.CopyToAsync(stream);
                    }
                    response.IsSuccess = true;
                    response.Path = fileName;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                response.IsSuccess = false;
            }
            return response;

        }
    }
}
