using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface IWorkHistoryService
    {
        Task<WorkHistory> Add(WorkHistory workHistory);
        Task<bool> Delete(WorkHistory workHistory);
        Task<bool> Update(WorkHistory workHistory);
    }
}
