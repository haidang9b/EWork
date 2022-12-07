using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class RecruitmentPost : BaseEntity
    {
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public long CompanyId { get; set; }
        public int Salary { get; set; }
        public Company Company { get; set; }
        public long UpdatedBy { get; set; }
        public User UpdatedByUser { get; set; }
        public DateTimeOffset Deadline { get; set; }
        public bool IsActive { get; set; }
    }
}
