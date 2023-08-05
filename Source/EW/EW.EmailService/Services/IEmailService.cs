using EW.Services.Email.Models;

namespace EW.Services.Email.Services;

public interface IEmailService
{
    Task SendEmail(EmailDataModel data);
}
