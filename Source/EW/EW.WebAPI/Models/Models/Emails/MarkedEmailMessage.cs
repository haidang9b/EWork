using EW.MessageBus;

namespace EW.WebAPI.Models.Models.Emails
{
    public class MarkedEmailMessage: BaseMessage
    {
        public string? ToEmail { get; set; }
        public string? CompanyName { get; set; }
        public string? FullName { get; set; }
    }
}
