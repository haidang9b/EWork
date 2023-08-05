using EW.Commons.Enums;

namespace EW.Domain.ViewModels;

public class JobAppliedViewModel
{
    public long Id { get; set; }
    public long UserCVId { get; set; }
    public string CVName { get; set; }
    public long RecruitmentPostId { get; set; }
    public string JobTitle { get; set; }
    public long CompanyId { get; set; }
    public string CompanyName { get; set; }
    public string CVUrl { get; set; }
    public string Description { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset UpdatedDate { get; set; }
    public EApplicationStatus Status { get; set; }
}
