using System.Text.Json.Serialization;

namespace EW.Domain.Entities
{
    public class BlogCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public virtual ICollection<Blog> Blogs { get; set; }
    }
}
