using EW.MessageBus;

namespace EW.Services.Email.Messages
{
    public class ChangeStatusCompanyMessage : BaseMessage
    {
        public string? CompanyName { get; set; }
        public string? ToEmail { get; set; }
        public string? FromStatus { get; set; }
        public string? ToStatus { get; set; }
        public string? URL { get; set; }
    }
}
