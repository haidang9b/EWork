using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.ViewModels
{
    public class TopComapnyModel
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public int JobsHiring { get; set; }
        public string AvatarUrl { get; set; }
        public ECompanyType CompanyType { get; set; }
        public bool Featured { get; set; }
    }
}
