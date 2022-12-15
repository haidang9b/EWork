using EW.Commons.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EW.Domain.Entities
{
    public class Company: BaseEntity
    {
        [StringLength(200)]
        public string CompanyName { get; set; }
        [StringLength(12, MinimumLength = 9, ErrorMessage = "Độ dài số điện thoại phải từ 9 đến 12 kí tự")]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        [StringLength(300)]
        public string Address { get; set; }
        [StringLength(50)]
        [DefaultValue("")]
        public string TaxNumber { get; set; }
        public EStatusRecruiter Status { get; set; }
    }
}
