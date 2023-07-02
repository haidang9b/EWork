using EW.Commons.Enums;

namespace EW.Domain.ViewModels
{
    public class AppliedForBusinessViewModel
    {
        public long Id { get; set; }
        public CVInforJobApplicationViewModel? CV { get; set; }
        public UserInforJobApplicationViewModel? User { get; set; }
        public PostInforJobApplicationViewModel? Post { get; set; }
        public string? Description { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
        public EApplicationStatus Status { get; set; }
    }

    public class UserInforJobApplicationViewModel
    {
        public long Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }

    public class PostInforJobApplicationViewModel
    {
        public long RecruitmentPostId { get; set; }
        public string? JobTitle { get; set; }
        public long CompanyId { get; set; }
    }

    public class CVInforJobApplicationViewModel
    {
        public long UserCVId { get; set; }
        public string? CVName { get; set; }
        public string? CVUrl { get; set; }
    }
}
