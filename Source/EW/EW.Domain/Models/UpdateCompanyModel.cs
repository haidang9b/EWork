using EW.Commons.Enums;

namespace EW.Domain.Models
{
    public class UpdateCompanyModel
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public EStatusRecruiter Status { get; set; }
        public ECompanyType CompanyType { get; set; }
        public string Country { get; set; }
        public ETeamSize TeamSize { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
    }
}
