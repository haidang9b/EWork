using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;

namespace EW.Services.Constracts
{
    public interface IRecruiterService
    {
        Task<bool> AddNewRecruiter(RegisterRecruiterModel model);
        Task<IEnumerable<RecruiterViewModel>> GetRecruiters();
        Task<bool> AssignUserToCompany(AddNewRecruiterAccountModel model);
        Task<RecruiterViewModel> GetRecruiterByUser(User model);
        Task<IEnumerable<RecruiterViewModel>> GetRecruitersByCompany(Company company);
    }
}
