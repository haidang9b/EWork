using EW.Commons.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace EW.Domain.Entities;

public class Company : BaseEntity
{
    [StringLength(200)]
    public string CompanyName { get; set; }

    [StringLength(12, MinimumLength = 9, ErrorMessage = "Độ dài số điện thoại phải từ 9 đến 12 kí tự")]
    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    [StringLength(300)]
    public string Address { get; set; }

    [StringLength(50)]
    [DefaultValue("")]
    public string TaxNumber { get; set; }

    [StringLength(350)]
    public string AvatarUrl { get; set; }

    public EStatusRecruiter Status { get; set; }

    [StringLength(10)]
    [DefaultValue("VN")]
    public string Country { get; set; }

    [DefaultValue(ETeamSize.ZeroTo50)]
    public ETeamSize TeamSize { get; set; }

    [DefaultValue(ECompanyType.Product)]
    public ECompanyType CompanyType { get; set; }

    [DefaultValue("")]
    public string Description { get; set; }

    [DefaultValue(false)]
    public bool Featured { get; set; }
}
