using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;

namespace EW.Services.Constracts;

public interface ICompanyService
{
    Task<Company> Find(Company company);

    Task<Company> GetCompanyByUser(User user);

    Task<IEnumerable<Company>> GetCompanies();

    Task<bool> UpdateInformationCompany(UpdateCompanyModel model);

    Task<Company> GetCompany(Company model);

    Task<Company> AddCompany(Company model);

    Task<bool> UploadAvatarCompany(Company company);

    Task<IEnumerable<TopComapnyModel>> GetTopCompanies();
}
