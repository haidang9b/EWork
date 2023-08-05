using EW.MessageBus;

namespace EW.WebAPI.Models.Models.Emails
{
    public class ChangeStatusCompanyMessage : BaseMessage
    {
        public required string CompanyName { get; set; }
        public required string ToEmail { get; set; }
        public required string FromStatus { get; set; }
        public required string ToStatus { get; set; }
        public required string URL { get; set; }
    }
}
