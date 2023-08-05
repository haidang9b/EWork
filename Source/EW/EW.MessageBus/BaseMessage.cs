namespace EW.MessageBus
{
    public abstract class BaseMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTimeOffset MessageCreated { get; set; } = DateTimeOffset.Now;
    }
}