using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface IEducationService
    {
        Task<Education> Add(Education model);
        Task<bool> Delete(Education model);
        Task<bool> Update(Education model);
    }
}
