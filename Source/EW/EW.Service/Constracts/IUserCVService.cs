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
        public Task<bool> AddCV(UserCV model);
        public Task<bool> RemoveCV(UserCV model);
        public Task<IEnumerable<UserCV>> GetUserCVsByUser(User model);
    }
}
