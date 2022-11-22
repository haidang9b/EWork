using EW.Domain.Entities;
using EW.Domain.ViewModels;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.Models.Uploads;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public UploadsController(ILogger<UploadsController> logger, IWebHostEnvironment webHostEnvironment, IUserService userService, IUserCVService userCVService)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _userService = userService;
            _userCVService = userCVService;
        }

        [Authorize(Roles= "Student")]
        [HttpPost("upload-new-cv")]
        public async Task<IActionResult> UploadNewCV([FromForm]UploadNewCVModel model)
        {
            var result = new ApiResult();

            try
            {
                var fileExtension = Path.GetExtension(model.File.FileName);
                var acceptExtensionFiles = new string[] { ".docx", ".doc", ".pdf" };
                var fileNameRequest = model.File.FileName; 
                if (!acceptExtensionFiles.Contains(fileExtension))
                {
                    result.IsSuccess = false;
                    result.Message = "Loại file này không được chấp nhận";

                    return Ok(result);
                }
                if (model.File.Length > 10000000)
                {
                    result.IsSuccess = false;
                    result.Message = "File lớn hơn 10MB, không thể upload";
                    return Ok(result);
                }

                var uploadModel = new ImportFileModel { File = model.File, Type = Commons.Enums.EFileType.CV };
                var resultUpload = await WriteFile(uploadModel);
                var user = await _userService.GetUser(new User { Username = User.Identity.Name });

                if (resultUpload.IsSuccess)
                {
                    var ownerCV = new UserCV
                    {
                        CVUrl = resultUpload.Path,
                        CVName = fileNameRequest,
                        UserId = user.Id
                    };

                    var resultAddCV = await _userCVService.AddCV(ownerCV);
                    if(resultAddCV)
                    {
                        result.IsSuccess = true;
                        result.Message = "Upload cv thành công";
                        result.Data = await _userCVService.GetUserCVByInfo(new UserCV { CVUrl = resultUpload.Path});
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Message = "Không thể upload cv này lên";
                    }

                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Không thể upload cv này lên";
                }

                
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);

            }

            return Ok(result);
        }

        [NonAction]
        private async Task<ResponseWriteFile> WriteFile(ImportFileModel model)
        {
            var result = new ResponseWriteFile();
            try
            {
                var folder = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads");

                var fileName = $"{model.Type}_{DateTime.Now.ToString("yyyyMMddHHmmss")}_{model.File.FileName}";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                if (model.File != null && model.File.Length > 0)
                {
                    string filePath = Path.Combine(folder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.File.CopyToAsync(stream);
                    }
                    result.IsSuccess = true;
                    result.Path = filePath;
                }
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                result.IsSuccess = false;
            }
            return result;
            
        }


    }
}
