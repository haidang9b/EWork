using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.RecruitmentPosts
{
    public class RecruitmentPostModel
    {
        public long Id { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public int SalaryFrom { get; set; }
        public int SalaryTo { get; set; }
        public ECurrency Currency { get; set; }
        public DateTimeOffset Deadline { get; set; }
        public long? CompanyId { get; set; }
        public ESalaryType SalaryType { get; set; }
    }
}
