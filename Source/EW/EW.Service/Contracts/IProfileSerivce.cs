using EW.Domain.Entities;
using EW.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IProfileSerivce
    {
        Task<Profile> GetProfile(User user);
        Task<Profile> InitProfile(User user);
        Task<bool> UpdateProfile(Profile profile);
        Task<IEnumerable<ProfileOpenForWorkViewModel>> GetProfileOpenForWorks();
    }
}
