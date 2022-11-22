using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IUserExperienceService
    {
        public Task<IEnumerable<UserExperience>> GetUserExperiencesByUser(User model);
    }
}
