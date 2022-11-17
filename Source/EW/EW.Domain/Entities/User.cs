using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EW.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageUrl { get; set; }
        public string CoverLetter { get; set; }
        [ForeignKey("Role")]
        public long RoleId { get; set; }
        public Role Role { get; set; }
        public virtual ICollection<UserExperence> Experences { get; set; }
        public virtual ICollection<UserCV> CVs { get; set; }

    }
}
