using System.Text.Json.Serialization;

namespace EW.Domain.Entities
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
