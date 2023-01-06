using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
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
        Task<IEnumerable<JobAppliedViewModel>> GetJobsApplied(User user);
        Task<IEnumerable<AppliedForBusinessViewModel>> GetAppliedsForBusiness(User user);
        Task<bool> Update(Application application);
        Task<bool> IsHasRole(ApplicationUserModel model);
    }
}
