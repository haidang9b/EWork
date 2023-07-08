using System.Text.Json.Serialization;

namespace EW.Domain.Entities
{
    public class Profile : BaseEntity
    {
        public string Address { get; set; }
        public string Linkedin { get; set; }
        public string Github { get; set; }
        public string EmailContact { get; set; }
        public string PhoneNumber { get; set; }
        public long UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public string Objective { get; set; }
        public string Skills { get; set; }
        public virtual ICollection<WorkHistory>? WorkHistory { get; set; }
        public virtual ICollection<Education>? Educations { get; set; }
        public virtual ICollection<Project>? Projects { get; set; }
        public virtual ICollection<Certificate>? Certificates { get; set; }
        public bool IsOpenForWork { get; set; }
    }
}
