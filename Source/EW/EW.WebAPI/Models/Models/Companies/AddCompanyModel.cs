using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.Companies
{
    public class AddCompanyModel
    {
        public string CompanyName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string TaxNumber { get; set; } = string.Empty;
        public EStatusRecruiter Status { get; set; }
        public bool Featured { get; set; }
    }
}