using EW.MessageBus;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace EW.MessageSender
{
    public class RabbitMQMessageSender : IRabbitMQMessageSender
    {
        private IConnection _connection;
        private readonly RabbitMQConfiguration _rabbitMQConfiguration;
        public RabbitMQMessageSender(IOptions<RabbitMQConfiguration> rabbitMQConfiguration)
        {
           _rabbitMQConfiguration = rabbitMQConfiguration.Value;
        }
        public void SendMessage(BaseMessage baseMessage, string queueName)
        {
            if (IsConnected())
            {
                using var channel = _connection.CreateModel();

                channel.QueueDeclare(queue: queueName, 
                                    durable: false,
                                    exclusive: false,
                                    autoDelete: false,
                                    arguments: null);

                var json = JsonConvert.SerializeObject(baseMessage);

                var body = Encoding.UTF8.GetBytes(json);

                channel.BasicPublish(exchange: "", routingKey: queueName, basicProperties: null, body: body);
            }
        }

        private void CreateConnection()
        {
            try
            {
                var factory = new ConnectionFactory
                {
                    HostName = _rabbitMQConfiguration.Host,
                    UserName = _rabbitMQConfiguration.Username,
                    Password = _rabbitMQConfiguration.Password,
                };
                _connection = factory.CreateConnection();
            }
            catch
            {

            }
        }

        private bool IsConnected()
        {
            if (_connection != null)
            {
                return true;
            }
            CreateConnection();
            return _connection != null;
        }
    }
}