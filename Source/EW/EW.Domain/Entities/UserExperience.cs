﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Entities
{
    public class UserExperience:BaseEntity
    {
        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
        [StringLength(350)]
        public string CompanyName { get; set; }
        public DateTimeOffset FromDate { get; set; }
        public DateTimeOffset ToDate { get; set; }
    }
}