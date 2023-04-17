using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Application: BaseEntity
    {
        public string CoverLetter { get; set; }
        public long UserCVId { get; set; }
        public UserCV UserCV { get; set; }
        public long RecruitmentPostId { get; set; }
        public RecruitmentPost RecruitmentPost { get; set; }
        public string Description { get; set; }
        public EApplicationStatus Status { get; set; }
    }
}
