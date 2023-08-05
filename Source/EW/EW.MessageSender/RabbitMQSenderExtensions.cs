using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EW.MessageSender;

public static class RabbitMQSenderExtensions
{
    public static void AddRabbitMQSender(this IServiceCollection services,
        IConfigurationRoot configuration)
    {
        services.Configure<RabbitMQConfiguration>(configuration.GetSection("RabbitMQConfiguration"));

        services.AddSingleton<IRabbitMQMessageSender, RabbitMQMessageSender>();
    }
}
