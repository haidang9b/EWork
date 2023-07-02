using EW.Domain.Models;

namespace EW.Services.Constracts
{
    public interface IEmailService
    {
        Task SendEmail(EmailDataModel data);
    }
}
