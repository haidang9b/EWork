namespace EW.WebAPI.Models.Models.Uploads
{
    public class UploadFileModel
    {
        public required IFormFile File { get; set; }
    }
    public class UploadNewCVModel : UploadFileModel
    {
    }

    public class UploadAvatarModel : UploadFileModel
    {
    }
}
