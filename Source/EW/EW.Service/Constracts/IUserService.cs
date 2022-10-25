using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();
        Task<bool> AddUser(User user);
        Task<User> GetUser(User user);
        Task<bool> Register(User user);
    }
}
