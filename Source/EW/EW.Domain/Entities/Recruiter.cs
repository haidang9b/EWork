﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class Recruiter: BaseEntity
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public long CompanyId { get; set; }
        public Company Company { get; set; }
        public string Position { get; set; }
    }
}
