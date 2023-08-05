using EW.MessageBus;

namespace EW.Services.Email.Messages
{
    public class RecoveryPasswordMessage: BaseMessage
    {
        public string? URL { get; set; }
        public string? FullName { get; set; }
        public string? To { get; set; }
    }
}
