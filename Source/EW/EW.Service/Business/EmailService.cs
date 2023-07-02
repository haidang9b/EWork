using EW.Domain.Models;
using EW.Services.Constracts;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace EW.Services.Business
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<EmailConfig> _emailConfig;
        public EmailService(IOptions<EmailConfig> emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public async Task SendEmail(EmailDataModel data)
        {
            MailMessage mail = new MailMessage();
            SmtpClient server = new SmtpClient(_emailConfig.Value.Mail);
            mail.From = new MailAddress(_emailConfig.Value.Mail, "EWork ");
            mail.Subject = data.Subject;
            mail.To.Add(data.ToEmail);
            mail.Body = data.Body;
            mail.IsBodyHtml = true;
            server.Host = _emailConfig.Value.Host;
            server.Port = _emailConfig.Value.Port;
            server.UseDefaultCredentials = false;
            server.Credentials = new NetworkCredential(userName: _emailConfig.Value.Mail, password: _emailConfig.Value.Password);
            server.EnableSsl = true;
            await server.SendMailAsync(mail);
        }
    }
}
