using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EW.Domain.Entities;

public class Role : BaseEntity
{
    [StringLength(100)]
    public string Name { get; set; }

    [StringLength(100)]
    public string Description { get; set; }

    [JsonIgnore]
    public virtual ICollection<User> Users { get; set; }
}
