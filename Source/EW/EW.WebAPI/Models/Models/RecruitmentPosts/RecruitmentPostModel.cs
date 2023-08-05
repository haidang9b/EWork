using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.RecruitmentPosts;

public class RecruitmentPostModel
{
    public long Id { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string JobDescription { get; set; } = string.Empty;
    public int SalaryFrom { get; set; }
    public int SalaryTo { get; set; }
    public ECurrency Currency { get; set; }
    public DateTimeOffset Deadline { get; set; }
    public long? CompanyId { get; set; }
    public ESalaryType SalaryType { get; set; }
    public EWorkingType WorkingType { get; set; }
    public string TechStacks { get; set; } = string.Empty;
    public double YearExperience { get; set; }
}
