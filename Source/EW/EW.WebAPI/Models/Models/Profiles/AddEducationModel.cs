namespace EW.WebAPI.Models.Models.Profiles;

public class AddEducationModel
{
    public string OrgName { get; set; } = string.Empty;
    public DateTimeOffset From { get; set; }
    public DateTimeOffset To { get; set; }
    public string Description { get; set; } = string.Empty;
}
