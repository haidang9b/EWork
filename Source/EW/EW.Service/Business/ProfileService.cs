using EW.Commons.Constaints;
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
    public class ProfileService : IProfileSerivce
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProfileService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Profile> GetProfile(User user)
        {
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username);
            return await _unitOfWork.Repository<Profile>().FirstOrDefaultAsync(item => item.UserId == currentUser.Id, "WorkHistory,Educations,Projects,Certificates");
        }

        public async Task<Profile> InitProfile(User user)
        {
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username);
            var newProfile = new Profile
            {
                UserId = currentUser.Id,
                Address = Constaints.STRING_BLANK,
                Github = Constaints.STRING_BLANK,
                Linkedin = Constaints.STRING_BLANK,
                PhoneNumber = Constaints.STRING_BLANK,
                EmailContact = currentUser.Email,
                Objective = Constaints.STRING_BLANK,
                Skills = Constaints.STRING_BLANK,
                IsOpenForWork = false,
            };
            await _unitOfWork.Repository<Profile>().AddAsync(newProfile);
            if((await _unitOfWork.SaveChangeAsync()) == false){
                throw new Exception("Không thể khởi tại profile");
            }
            return newProfile;
        }

        public async Task<bool> UpdateProfile(Profile profile)
        {
            var currentProfile = await _unitOfWork.Repository<Profile>().FirstOrDefaultAsync(item => item.Id == profile.Id);
            if(currentProfile == null)
            {
                throw new Exception("Không có profile, vui lòng thử lại");
            }
            currentProfile.Address = profile.Address;
            currentProfile.Github = profile.Github;
            currentProfile.Linkedin = profile.Linkedin;
            currentProfile.PhoneNumber = profile.PhoneNumber;
            currentProfile.EmailContact = profile.EmailContact;
            currentProfile.Objective = profile.Objective;
            currentProfile.Skills = profile.Skills;
            currentProfile.IsOpenForWork = profile.IsOpenForWork;
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
