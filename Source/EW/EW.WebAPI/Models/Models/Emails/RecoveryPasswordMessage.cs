using EW.MessageBus;

namespace EW.WebAPI.Models.Models.Emails
{
    public class RecoveryPasswordMessage:BaseMessage
    {
        public required string URL { get; set; }
        public required string FullName { get; set; }
        public required string ToEmail { get; set; }
    }
}
