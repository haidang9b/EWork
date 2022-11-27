using EW.Commons.Enums;
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
                CoverLetter = ""
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
                ImageUrl = user.ImageUrl
            });
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> UpdateUser(User user)
        {
            _unitOfWork.Repository<User>().Update(user);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
