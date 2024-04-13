using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EW.Domain.Entities;

public class User : BaseEntity
{
    [StringLength(150)]
    public string Username { get; set; }

    [StringLength(150)]
    public string Email { get; set; }

    [StringLength(150)]
    public string FullName { get; set; }

    [StringLength(200)]
    public string Password { get; set; }

    [StringLength(12, MinimumLength = 9, ErrorMessage = "Độ dài số điện thoại phải từ 9 đến 12 kí tự")]
    public string PhoneNumber { get; set; }

    [StringLength(350)]
    public string ImageUrl { get; set; }

    public string CoverLetter { get; set; }

    [StringLength(150)]
    public string TokenResetPassword { get; set; }

    public bool IsActive { get; set; }

    [ForeignKey("Role")]
    public long RoleId { get; set; }

    public Role Role { get; set; }

    [JsonIgnore]
    public virtual ICollection<UserExperience> Experences { get; set; }

    [JsonIgnore]
    public virtual ICollection<UserCV> CVs { get; set; }

}
