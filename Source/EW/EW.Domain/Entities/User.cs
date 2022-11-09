using System.ComponentModel.DataAnnotations.Schema;

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
        [ForeignKey("Role")]
        public long RoleId { get; set; }
        public Role Role { get; set; }
    }
}
