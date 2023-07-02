using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EW.Domain.Entities
{
    public class UserCV : BaseEntity
    {
        [ForeignKey("User")]
        public long UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        [StringLength(150)]
        public string CVName { get; set; }
        [StringLength(350)]
        public string CVUrl { get; set; }
        public bool Featured { get; set; }
    }
}
