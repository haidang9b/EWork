using EW.MessageBus;

namespace EW.Services.Email.Messages
{
    public class MarkedEmailMessage: BaseMessage
    {
        public string? ToEmail { get; set; }
        public string? CompanyName { get; set; }
        public string? FullName { get; set; }
    }
}
