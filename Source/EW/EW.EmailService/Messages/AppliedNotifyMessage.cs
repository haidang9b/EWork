using EW.MessageBus;

namespace EW.Services.Email.Messages
{
    public class AppliedNotifyMessage : BaseMessage
    {
        public string? CompanyName { get; set; }
        public string? ToEmail { get; set; }
        public string? FullName { get; set; }
    }
}
