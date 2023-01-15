using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Blog: BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public long UserId { get; set; }
        public User? User { get; set; }
        public long BlogCategoryId { get; set; }
        public BlogCategory? BlogCategory { get;set; }
    }
}
