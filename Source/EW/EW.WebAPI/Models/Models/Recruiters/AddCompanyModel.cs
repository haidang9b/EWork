using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.Recruiters
{
    public class AddCompanyModel
    {
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public EStatusRecruiter Status { get; set; }
    }
}