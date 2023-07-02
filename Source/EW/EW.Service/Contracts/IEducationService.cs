using EW.Domain.Entities;

namespace EW.Services.Contracts
{
    public interface IEducationService
    {
        Task<Education> Add(Education model);
        Task<bool> Delete(Education model);
        Task<bool> Update(Education model);
    }
}
