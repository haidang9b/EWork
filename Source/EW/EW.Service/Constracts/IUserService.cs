using EW.Domain.Entities;

namespace EW.Services.Constracts
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();
        Task<bool> AddUser(User user);
        Task<User> GetUser(User user);
        Task<bool> Register(User user);
        Task<bool> RegisterWithGoogle(User user);
        Task<IEnumerable<Role>> GetRoles();
    }
}
