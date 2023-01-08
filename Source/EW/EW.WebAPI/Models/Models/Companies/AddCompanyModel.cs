using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.Companies
{
    public class AddCompanyModel
    {
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public EStatusRecruiter Status { get; set; }
        public bool Featured { get; set; }
    }
}