using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Models
{
    public class AddApplicationModel
    {
        public long UserCVId { get; set; }
        public long RecruitmentPostId { get; set; }
        public long UserId { get; set; }
        public string CoverLetter { get; set; }
    }
}