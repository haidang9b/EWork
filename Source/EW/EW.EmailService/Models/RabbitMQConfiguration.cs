namespace EW.Services.Email.Models;

public class RabbitMQConfiguration
{
    public required string HostName { get; set; }
    public required string Password { get; set; }
    public required string UserName { get; set; }
}
