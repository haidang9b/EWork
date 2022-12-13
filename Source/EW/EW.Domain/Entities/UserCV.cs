using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class UserCV : BaseEntity
    {
        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
        [StringLength(150)]
        public string CVName { get; set; }
        [StringLength(350)]
        public string CVUrl { get; set; }
    }
}
