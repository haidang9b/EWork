﻿using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EW.Domain.Entities
{
    public class Recruiter: BaseEntity
    {
        public string FullName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public EStatusRecruiter Status { get; set; }
    }
}
