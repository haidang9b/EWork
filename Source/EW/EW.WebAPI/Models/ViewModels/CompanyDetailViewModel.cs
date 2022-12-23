using EW.Commons.Enums;

namespace EW.WebAPI.Models.ViewModels
{
    public class CompanyDetailViewModel
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string AvatarUrl { get; set; }
        public string Country { get; set; }
        public ETeamSize TeamSize { get; set; }
        public ECompanyType CompanyType { get; set; }
        public string Description { get; set; }
        public List<RecruitmentPostShortViewModel> Posts { get; set; }
    }
}
