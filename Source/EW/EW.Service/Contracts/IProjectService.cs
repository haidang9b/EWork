using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface IProjectService
    {
        Task<Project> Add(Project model);
        Task<bool> Delete(Project model);
        Task<bool> Update(Project model);
    }
}
