using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Constracts;

namespace EW.Services.Business
{
    public class UserExperienceService : IUserExperienceService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserExperienceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<UserExperience>> GetUserExperiencesByUser(User model)
        {
            return await _unitOfWork.Repository<UserExperience>().GetAsync(item => item.UserId == model.Id);
        }
    }
}
