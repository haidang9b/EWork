using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class WorkHistory: History
    {
        public string CompanyName { get; set; }
        public bool IsWorking { get; set; }
    }
}
