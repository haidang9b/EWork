namespace EW.WebAPI.Models.Models.Uploads
{
    public class UploadFileModel
    {
        public IFormFile File { get; set; }
    }
    public class UploadNewCVModel : UploadFileModel
    {
    }

    public class UploadAvatarModel : UploadFileModel
    {
    }
}
