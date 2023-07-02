using EW.Commons.Enums;

namespace EW.Domain.Models
{
    public class AddApplicationModel
    {
        public long UserCVId { get; set; }
        public long RecruitmentPostId { get; set; }
        public long UserId { get; set; }
        public string CoverLetter { get; set; }
        public EApplicationStatus Status { get; set; }
        public string Description { get; set; }
    }
}