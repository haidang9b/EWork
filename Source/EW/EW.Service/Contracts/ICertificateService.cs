using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface ICertificateService
    {
        Task<Certificate> Add(Certificate model);
        Task<bool> Delete(Certificate model);
        Task<bool> Update(Certificate model);
    }
}
