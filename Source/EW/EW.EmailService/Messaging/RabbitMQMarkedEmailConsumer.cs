using EW.Services.Email.Messages;
using EW.Services.Email.Models;
using EW.Services.Email.Services;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EW.Services.Email.Messaging;

public class RabbitMQMarkedEmailConsumer : BackgroundService
{
    private IConnection _connection;
    private IModel _channel;
    private const string ExchangeName = "DirectMarkedEmail_Exchange";
    private const string MarkedEmailQueueName = "DirectMarkedEmailQueueName";
    private readonly IEmailService _emailService;

    public RabbitMQMarkedEmailConsumer(IEmailService emailService,
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
        _channel.QueueDeclare(queue: MarkedEmailQueueName,
                            durable: false,
                            exclusive: false,
                            autoDelete: false,
                            arguments: null);
        _channel.QueueBind(MarkedEmailQueueName, ExchangeName, "MarkedEmail");
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += (ch, ea) =>
        {
            var body = Encoding.UTF8.GetString(ea.Body.ToArray());
            MarkedEmailMessage markedEmailMessage = JsonSerializer.Deserialize<MarkedEmailMessage>(body)!;
            HandleMessage(markedEmailMessage).GetAwaiter().GetResult();

            _channel.BasicAck(ea.DeliveryTag, false);

        }; // ch is channel, ea is event args

        _channel.BasicConsume(MarkedEmailQueueName, false, consumer);
        return Task.CompletedTask;
    }

    private async Task HandleMessage(MarkedEmailMessage model)
    {
        try
        {
            var body = string.Empty;
            using (StreamReader reader = new(Path.Combine("EmailTemplates/MarkedNotify.html")))
            {
                body = reader.ReadToEnd();
            }

            var bodyBuilder = new System.Text.StringBuilder(body);
            bodyBuilder.Replace("{companyName}", model.CompanyName);
            bodyBuilder.Replace("{receiver}", model.FullName);

            var data = new EmailDataModel
            {
                Body = bodyBuilder.ToString(),
                Subject = $"[EWork] {model.CompanyName} đã đánh dấu hồ sơ của bạn",
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
