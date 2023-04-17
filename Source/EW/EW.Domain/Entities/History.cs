using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class History: BaseEntity
    {
        public long ProfileId { get; set; }
        [JsonIgnore]
        public Profile? Profile { get; set; }
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
        public string Description { get; set; }
    }
}
