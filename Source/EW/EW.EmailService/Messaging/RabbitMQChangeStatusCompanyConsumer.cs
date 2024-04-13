using EW.Services.Email.Messages;
using EW.Services.Email.Models;
using EW.Services.Email.Services;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace EW.Services.Email.Messaging;

public class RabbitMQChangeStatusCompanyConsumer : BackgroundService
{
    private readonly IConnection _connection;

    private readonly IModel _channel;

    private const string ExchangeName = "DirectChangeStatusCompany_Exchange";

    private const string ChangeStatusCompanyQueueName = "DirectChangeStatusCompanyQueueName";

    private readonly IEmailService _emailService;

    public RabbitMQChangeStatusCompanyConsumer(IEmailService emailService,
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
        _channel.QueueDeclare(queue: ChangeStatusCompanyQueueName,
                            durable: false,
                            exclusive: false,
                            autoDelete: false,
                            arguments: null);
        _channel.QueueBind(ChangeStatusCompanyQueueName, ExchangeName, "ChangeStatusCompany");
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += (ch, ea) =>
        {
            var body = Encoding.UTF8.GetString(ea.Body.ToArray());
            ChangeStatusCompanyMessage changeStatusCompanyMessage = JsonSerializer.Deserialize<ChangeStatusCompanyMessage>(body)!;
            HandleMessage(changeStatusCompanyMessage).GetAwaiter().GetResult();

            _channel.BasicAck(ea.DeliveryTag, false);

        }; // ch is channel, ea is event args

        _channel.BasicConsume(ChangeStatusCompanyQueueName, false, consumer);
        return Task.CompletedTask;
    }

    private async Task HandleMessage(ChangeStatusCompanyMessage model)
    {
        try
        {
            var body = string.Empty;
            using (StreamReader reader = new(Path.Combine("EmailTemplates/ChangeStatusCompany.html")))
            {
                body = reader.ReadToEnd();
            }

            var bodyBuilder = new System.Text.StringBuilder(body);
            bodyBuilder.Replace("{companyName}", model.CompanyName);
            bodyBuilder.Replace("{fromStatus}", model.FromStatus);
            bodyBuilder.Replace("{toStatus}", model.ToStatus);
            bodyBuilder.Replace("{url}", model.URL);

            var data = new EmailDataModel
            {
                Body = bodyBuilder.ToString(),
                Subject = $"[EWork] Cập nhật trạng thái cho doanh nghiệp",
                ToEmail = model.ToEmail
            };

            await _emailService.SendEmail(data);
        }
        catch 
        {
            throw;
        }
    }
}
