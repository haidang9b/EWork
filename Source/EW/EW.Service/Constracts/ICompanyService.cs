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
    public interface ICompanyService
    {
        Task<Company> Find(Company recruiter);
        Task<Company> GetCompanyByUser(User user);
        Task<IEnumerable<Company>> GetCompanies();
        Task<bool> UpdateInformationCompany(UpdateCompanyModel model);
        Task<Company> GetCompany(Company model);
        Task<bool> AddCompany(Company model);
        Task<bool> UploadAvatarCompany(Company company);
        Task<IEnumerable<TopComapnyModel>> GetTopCompanies();
    }
}
