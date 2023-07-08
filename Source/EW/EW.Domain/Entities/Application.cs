using EW.Commons.Enums;

namespace EW.Domain.Entities
{
    public class Application : BaseEntity
    {
        public string CoverLetter { get; set; }
        public long UserCVId { get; set; }
        public UserCV UserCV { get; set; }
        public long RecruitmentPostId { get; set; }
        public RecruitmentPost RecruitmentPost { get; set; }
        public string Description { get; set; }
        public EApplicationStatus Status { get; set; }
    }
}
