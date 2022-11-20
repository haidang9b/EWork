using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models
{
    public class ImportFileModel
    {
        public IFormFile File { get; set; }
        public EFileType Type { get; set; }
    }
}
