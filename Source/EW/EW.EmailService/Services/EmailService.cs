using EW.Services.Email.Models;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace EW.Services.Email.Services;

public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfig;
    public EmailService(IOptions<EmailConfiguration> emailConfig)
    {
        _emailConfig = emailConfig.Value;
    }

    public async Task SendEmail(EmailDataModel data)
    {
        MailMessage mail = new();
        SmtpClient server = new(_emailConfig.Mail);
        mail.From = new MailAddress(_emailConfig.Mail, "EWork ");
        mail.Subject = data.Subject;
        mail.To.Add(data.ToEmail);
        mail.Body = data.Body;
        mail.IsBodyHtml = true;
        server.Host = _emailConfig.Host;
        server.Port = _emailConfig.Port;
        server.UseDefaultCredentials = false;
        server.Credentials = new NetworkCredential(userName: _emailConfig.Mail, password: _emailConfig.Password);
        server.EnableSsl = true;
        await server.SendMailAsync(mail);
    }
}
