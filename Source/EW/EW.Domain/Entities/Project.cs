using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Project: History
    {
        public string ProjectName { get; set; }
        public string CustomerName { get; set; }
    }
}
