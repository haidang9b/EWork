using EW.Domain.Entities;
using EW.Domain.ViewModels;

namespace EW.Services.Constracts;

public interface IProfileSerivce
{
    Task<Profile> GetProfile(User user);

    Task<Profile> InitProfile(User user);

    Task<bool> UpdateProfile(Profile profile);

    Task<IEnumerable<ProfileOpenForWorkViewModel>> GetProfileOpenForWorks();
}
