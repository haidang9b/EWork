using EW.MessageBus;

namespace EW.Services.Email.Messages
{
    public class RecoveryPasswordMessage: BaseMessage
    {
        public required string URL { get; set; }
        public required string FullName { get; set; }
        public required string ToEmail { get; set; }
    }
}
