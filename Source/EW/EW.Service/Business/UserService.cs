using EW.Commons.Enums;
using EW.Commons.Helpers;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Constracts;

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
            var exist = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Email == user.Email || item.PhoneNumber == user.PhoneNumber);
            if (exist != null)
            {
                return false;
            }
            await _unitOfWork.Repository<User>().AddAsync(user);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            return await _unitOfWork.Repository<Role>().GetAllAsync();
        }

        public async Task<User> GetUser(User user)
        {
            var result = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Id == user.Id || item.Email == user.Email || item.Username == user.Username, includeProperties: "Role");
            return result;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _unitOfWork.Repository<User>().GetAllAsync(includeProperties: "Role");
        }

        public async Task<bool> Register(User user)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
            await _unitOfWork.Repository<User>().AddAsync(new User
            {
                Username = user.Username,
                Password = hashed,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                FullName = user.FullName,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                RoleId = user.RoleId,
                IsActive = true,
                ImageUrl = "",
                CoverLetter = "",
                TokenResetPassword = MyRandom.RandomString(30),
            });

            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> RegisterWithGoogle(User user)
        {
            var isExist = await GetUser(user);
            if(isExist != null)
            {
                return true;
            }
            var hashed = BCrypt.Net.BCrypt.HashPassword(DateTimeOffset.Now.ToString(), BCrypt.Net.BCrypt.GenerateSalt(12));
            await _unitOfWork.Repository<User>().AddAsync(new User
            {
                Username = user.Username,
                Password = hashed,
                PhoneNumber = user.PhoneNumber ?? "",
                Email = user.Email,
                FullName = user.FullName,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
                RoleId = (long)ERole.ID_Student,
                IsActive = true,
                ImageUrl = user.ImageUrl,
                TokenResetPassword = MyRandom.RandomString(30),
            });
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<string> GenKeyResetPassword(User user)
        {
            var key = MyRandom.RandomString(16);
            var userCurrent = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Id == user.Id && item.Email == user.Email && item.Username == user.Username);
            userCurrent.TokenResetPassword = key;
            await _unitOfWork.SaveChangeAsync();
            return key;
        }

        public async Task<bool> UpdateUser(User user)
        {
            user.UpdatedDate = DateTimeOffset.Now;
            _unitOfWork.Repository<User>().Update(user);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> ResetPassword(User user)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt(12));
            var exist = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username && item.Email == user.Email);
            exist.Password = hashed;
            exist.UpdatedDate = DateTimeOffset.Now;
            exist.TokenResetPassword = MyRandom.RandomString(30);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
