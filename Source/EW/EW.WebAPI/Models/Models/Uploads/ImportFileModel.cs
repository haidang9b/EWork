using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.Uploads;

public class ImportFileModel
{
    public required IFormFile File { get; set; }
    public EFileType Type { get; set; }
}
