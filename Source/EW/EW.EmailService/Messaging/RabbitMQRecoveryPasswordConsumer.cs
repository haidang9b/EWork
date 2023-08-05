using EW.Services.Email.Messages;
using EW.Services.Email.Models;
using EW.Services.Email.Services;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EW.Services.Email.Messaging;

public class RabbitMQRecoveryPasswordConsumer : BackgroundService
{
    private IConnection _connection;
    private IModel _channel;
    private const string ExchangeName = "DirectRecoveryPassword_Exchange";
    private const string RecoveryPasswordQueueName = "DirectRecoveryPasswordQueueName";
    private readonly IEmailService _emailService;

    public RabbitMQRecoveryPasswordConsumer(IEmailService emailService,
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
        _channel.QueueDeclare(queue: RecoveryPasswordQueueName,
                            durable: false,
                            exclusive: false,
                            autoDelete: false,
                            arguments: null);
        _channel.QueueBind(RecoveryPasswordQueueName, ExchangeName, "RecoveryPassword");
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += (ch, ea) =>
        {
            var body = Encoding.UTF8.GetString(ea.Body.ToArray());
            RecoveryPasswordMessage RecoveryPasswordMessage = JsonSerializer.Deserialize<RecoveryPasswordMessage>(body)!;
            HandleMessage(RecoveryPasswordMessage).GetAwaiter().GetResult();

            _channel.BasicAck(ea.DeliveryTag, false);

        }; // ch is channel, ea is event args

        _channel.BasicConsume(RecoveryPasswordQueueName, false, consumer);
        return Task.CompletedTask;
    }

    private async Task HandleMessage(RecoveryPasswordMessage model)
    {
        try
        {
            var body = string.Empty;
            using (StreamReader reader = new(Path.Combine("EmailTemplates/RecoveryPassword.html")))
            {
                body = reader.ReadToEnd();
            }

            var bodyBuilder = new System.Text.StringBuilder(body);
            bodyBuilder.Replace("{username}", model.FullName);
            bodyBuilder.Replace("{url}", model.URL);

            var data = new EmailDataModel
            {
                Body = bodyBuilder.ToString(),
                Subject = $"[EWork] Khôi phục mật khẩu",
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
