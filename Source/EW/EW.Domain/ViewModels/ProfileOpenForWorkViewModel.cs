using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.ViewModels
{
    public class ProfileOpenForWorkViewModel
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Linkedin { get; set; }
        public string Github { get; set; } 
        public string EmailContact { get; set; }
        public string PhoneNumber { get; set; }
        public string Objective { get; set; }
        public string Skill { get; set; }
        public long CVId { get; set; }
        public string CVName { get; set; }
        public string CVUrl { get; set; }
    }
}
