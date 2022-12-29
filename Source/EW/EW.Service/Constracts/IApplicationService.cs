using EW.Domain.Entities;
using EW.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IApplicationService
    {
        Task<Application> Add(AddApplicationModel model);
        Task<IEnumerable<Application>> GetByApplier(User user);
    }
}
