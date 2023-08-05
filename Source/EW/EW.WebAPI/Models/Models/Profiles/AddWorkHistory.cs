namespace EW.WebAPI.Models.Models.Profiles;

public class AddWorkHistory
{
    public string CompanyName { get; set; } = string.Empty;
    public bool IsWorking { get; set; }
    public DateTimeOffset From { get; set; }
    public DateTimeOffset To { get; set; }
    public string Description { get; set; } = string.Empty;
}
