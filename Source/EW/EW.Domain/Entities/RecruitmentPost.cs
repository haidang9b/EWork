using EW.Commons.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EW.Domain.Entities;

public class RecruitmentPost : BaseEntity
{
    [StringLength(300)]
    public string JobTitle { get; set; }

    public string JobDescription { get; set; }

    public ESalaryType SalaryType { get; set; }

    public int SalaryFrom { get; set; }

    public int SalaryTo { get; set; }

    public ECurrency Currency { get; set; }

    public DateTimeOffset Deadline { get; set; }

    [DefaultValue(EWorkingType.AtOffice)]
    public EWorkingType WorkingType { get; set; }

    public string TechStacks { get; set; }

    public double YearExperience { get; set; }

    public bool IsActive { get; set; }

    [ForeignKey("Company")]
    public long CompanyId { get; set; }

    public Company Company { get; set; }

    [ForeignKey("UpdatedByUser")]
    public long UpdatedBy { get; set; }

    public User UpdatedByUser { get; set; }
}
