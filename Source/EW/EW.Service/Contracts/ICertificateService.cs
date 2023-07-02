using EW.Domain.Entities;

namespace EW.Services.Contracts
{
    public interface ICertificateService
    {
        Task<Certificate> Add(Certificate model);
        Task<bool> Delete(Certificate model);
        Task<bool> Update(Certificate model);
    }
}
