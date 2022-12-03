using EW.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IEmailService
    {
        Task SendEmail(EmailDataModel data);
    }
}
