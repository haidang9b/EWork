using EW.MessageBus;

namespace EW.Services.Email.Messages;

public class AppliedNotifyMessage : BaseMessage
{
    public required string CompanyName { get; set; }
    public required string ToEmail { get; set; }
    public required string FullName { get; set; }
}
