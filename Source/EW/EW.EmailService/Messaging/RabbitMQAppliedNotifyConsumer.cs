using EW.Services.Email.Messages;
using EW.Services.Email.Models;
using EW.Services.Email.Services;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EW.Services.Email.Messaging
{
    public class RabbitMQAppliedNotifyConsumer : BackgroundService
    {
        private IConnection _connection;
        private IModel _channel;
        private const string ExchangeName = "DirectAppliedNotify_Exchange";
        private const string AppliedNotifyQueueName = "DirectAppliedNotifyQueueName";
        private readonly IEmailService _emailService;
        string queueName = "";

        public RabbitMQAppliedNotifyConsumer(
            IEmailService emailService,
            IOptions<RabbitMQConfiguration> rabbitMQConfiguration
            )
        {
            _emailService = emailService;
            var factory = new ConnectionFactory
            {
                HostName = rabbitMQConfiguration.Value.HostName,
                UserName = rabbitMQConfiguration.Value.UserName,
                Password = rabbitMQConfiguration.Value.Password,
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(ExchangeName, ExchangeType.Direct);
            _channel.QueueDeclare(queue: AppliedNotifyQueueName,
                                durable: false,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);
            _channel.QueueBind(AppliedNotifyQueueName, ExchangeName, "AppliedNotify");
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                var body = Encoding.UTF8.GetString(ea.Body.ToArray());
                AppliedNotifyMessage updatePaymentResultMessage = JsonSerializer.Deserialize<AppliedNotifyMessage>(body);
                HandleMessage(updatePaymentResultMessage).GetAwaiter().GetResult();

                _channel.BasicAck(ea.DeliveryTag, false);

            }; // ch is channel, ea is event args

            _channel.BasicConsume(AppliedNotifyQueueName, false, consumer);
            return Task.CompletedTask;
        }

        private async Task HandleMessage(AppliedNotifyMessage model)
        {
            try
            {
                var body = string.Empty;
                using (StreamReader reader = new(Path.Combine("EmailTemplates/AppliedNotify.html")))
                {
                    body = reader.ReadToEnd();
                }

                var bodyBuilder = new System.Text.StringBuilder(body);
                bodyBuilder.Replace("{companyName}", model.CompanyName);
                bodyBuilder.Replace("{receiver}", model.FullName);

                var data = new EmailDataModel
                {
                    Body = bodyBuilder.ToString(),
                    Subject = $"[EWork] {model.CompanyName} đã nhận được hồ sơ ứng tuyển của bạn",
                    ToEmail = model.ToEmail
                };

                await _emailService.SendEmail(data);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
