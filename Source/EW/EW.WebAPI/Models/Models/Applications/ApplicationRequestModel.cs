namespace EW.WebAPI.Models.Models.Applications;

public class ApplicationRequestModel
{
    public long UserCVId { get; set; }
    public long RecruitmentPostId { get; set; }
    public string CoverLetter { get; set; } = string.Empty;
}

public class MarkedApplicationRequestModel : ApplicationRequestModel
{
    public string Description { get; set; } = string.Empty;
    public long? UserId { get; set; }
}
