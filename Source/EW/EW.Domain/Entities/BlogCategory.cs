using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
