using System.Text.Json.Serialization;

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
