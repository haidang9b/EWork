using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.ViewModels
{
    public class NumberApplicationViewModel
    {
        public EApplicationStatus Type { get; set; }
        public int Number { get; set; }
    }
}
