﻿using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Domain.Models
{
    public class UpdateCompanyModel
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public EStatusRecruiter Status { get; set; }
    }
}
