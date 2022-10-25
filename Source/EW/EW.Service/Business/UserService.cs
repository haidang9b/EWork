using EW.Commons.Constaints;
using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Constracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddUser(User user)
        {
            var exist = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Email == user.Email || item.PhoneNumber == user.PhoneNumber );
            if(exist != null)
            {
                return false;
            }

            return await _unitOfWork.Repository<User>().AddAsync(user);
        }

        public async Task<User> GetUser(User user)
        {
            var result = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Email == user.Email || item.Username == user.Username);
            var role = await _unitOfWork.Repository<Role>().FirstOrDefaultAsync(r => r.Id == result.RoleId);
            result.Role = new Role { Id = role.Id, Name = role.Name, Description = role.Description, UpdatedDate = role.UpdatedDate, CreatedDate = role.CreatedDate };
            return result;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _unitOfWork.Repository<User>().GetAllAsync();
        }

        public async Task<bool> Register(User user)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(user.Password,BCrypt.Net.BCrypt.GenerateSalt(12));
            var result = await _unitOfWork.Repository<User>().AddAsync(new User
            {
                Username = user.Username,
                Password = hashed,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                FullName = user.FullName,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                RoleId = (long)ERole.ID_Faculty,
                Role = await _unitOfWork.Repository<Role>().FirstOrDefaultAsync(item => item.Id == (long)ERole.ID_Faculty),
            });

            return result;
        }
    }
}
