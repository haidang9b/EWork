using EW.MessageBus;

namespace EW.WebAPI.Models.Models.Emails
{
    public class RecoveryPasswordMessage:BaseMessage
    {
        public string? URL { get; set; }
        public string? FullName { get; set; }
        public string? To { get; set; }
    }
}
