using EW.Commons.Enums;

namespace EW.WebAPI.Models.ViewModels
{
    public class RecruitmentPostShortViewModel
    {
        public long Id { get; set; }
        public string JobTitle { get; set; }
        public ESalaryType SalaryType { get; set; }
        public int SalaryFrom { get; set; }
        public int SalaryTo { get; set; }
        public ECurrency Currency { get; set; }
        public string TechStacks { get; set; }
        public double YearExperience { get; set; }
        public string JobDescription { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
    }
}