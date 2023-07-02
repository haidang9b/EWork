using EW.Domain.Entities;

namespace EW.Services.Constracts
{
    public interface IUserExperienceService
    {
        Task<IEnumerable<UserExperience>> GetUserExperiencesByUser(User model);
    }
}
