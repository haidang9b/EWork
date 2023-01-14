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
        public string FullName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Linkedin { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty; 
        public string EmailContact { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Objective { get; set; } = string.Empty;
        public string Skill { get; set; } = string.Empty;
        public long CVId { get; set; }
        public string CVName { get; set; } = string.Empty;
        public string CVUrl { get; set; } = string.Empty;
    }
}
