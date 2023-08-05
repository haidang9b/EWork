using EW.Domain.Entities;

namespace EW.Services.Contracts;

public interface IWorkHistoryService
{
    Task<WorkHistory> Add(WorkHistory workHistory);
    Task<bool> Delete(WorkHistory workHistory);
    Task<bool> Update(WorkHistory workHistory);
}
