using EW.MessageBus;

namespace EW.MessageSender;

public interface IRabbitMQMessageSender
{
    void SendMessage(BaseMessage baseMessage, string queueName);
}
