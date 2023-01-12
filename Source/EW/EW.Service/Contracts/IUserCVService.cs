using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IUserCVService
    {
        Task<UserCV> AddCV(UserCV model);
        Task<bool> RemoveCV(UserCV model);
        Task<IEnumerable<UserCV>> GetUserCVsByUser(User model);
        Task<UserCV> GetUserCVByInfo(UserCV model);
        Task<bool> UpdateFeaturedCV(UserCV model);
    }
}
