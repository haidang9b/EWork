using EW.Domain.Entities;

namespace EW.Services.Contracts;

public interface IProjectService
{
    Task<Project> Add(Project model);
    Task<bool> Delete(Project model);
    Task<bool> Update(Project model);
}
