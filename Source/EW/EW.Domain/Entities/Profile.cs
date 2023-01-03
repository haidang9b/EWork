using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Profile: BaseEntity
    {
        public string Address { get; set; } = string.Empty;
        public string Linkedin { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty;
        public string EmailContact { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public long UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public string Objective { get; set; } = string.Empty;
        public string Skills { get; set; } = string.Empty;
        public virtual ICollection<WorkHistory>? WorkHistory { get; set; }
        public virtual ICollection<Education>? Educations { get; set; }
        public virtual ICollection<Project>? Projects { get; set; }
        public virtual ICollection<Certificate>? Certificates { get; set; }
    }
}
