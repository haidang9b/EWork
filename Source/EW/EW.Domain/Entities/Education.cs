using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Education : History
    {
        public string OrgName { get; set; } = String.Empty;
    }
}
