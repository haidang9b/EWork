using EW.Commons.Constaints;
using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Constracts;

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
            return await _unitOfWork.Repository<Profile>()
                .FirstOrDefaultAsync(item => item.UserId == currentUser.Id, 
                $"{nameof(Profile.WorkHistory)},{nameof(Profile.Educations)},{nameof(Profile.Projects)},{nameof(Profile.Certificates)}");
        }

        public async Task<IEnumerable<ProfileOpenForWorkViewModel>> GetProfileOpenForWorks()
        {
            var candidates = await _unitOfWork.Repository<Profile>().GetAsync(item => item.IsOpenForWork, nameof(Profile.User));
            var cvsFeatured = await _unitOfWork.Repository<UserCV>().GetAsync(item => item.Featured);
            var result = new List<ProfileOpenForWorkViewModel>();
            foreach (var profile in candidates)
            {
                var cvFeaturedOfProfile = cvsFeatured.FirstOrDefault(item => item.UserId == profile.UserId);
                if (cvFeaturedOfProfile is null)
                    continue;
                result.Add(new ProfileOpenForWorkViewModel
                {
                    UserId = profile.UserId,
                    FullName = profile.User?.FullName ?? "",
                    Address = profile.Address,
                    Linkedin = profile.Linkedin,
                    Github = profile.Github,
                    EmailContact = profile.EmailContact,
                    PhoneNumber = profile.PhoneNumber,
                    Objective = profile.Objective,
                    Skill = profile.Skills,
                    CVId = cvFeaturedOfProfile.Id,
                    CVName = cvFeaturedOfProfile.CVName,
                    CVUrl = cvFeaturedOfProfile.CVUrl,
                });
            }
            return result;
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
            if (!await _unitOfWork.SaveChangeAsync())
            {
                throw new EWException("Không thể khởi tại profile");
            }
            newProfile.Certificates = new List<Certificate>();
            newProfile.Projects = new List<Project>();
            newProfile.Educations = new List<Education>();
            newProfile.WorkHistory = new List<WorkHistory>();
            return newProfile;
        }

        public async Task<bool> UpdateProfile(Profile profile)
        {
            var currentProfile = await _unitOfWork.Repository<Profile>().FirstOrDefaultAsync(item => item.Id == profile.Id);
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Id == profile.UserId);
            if (currentProfile is null || currentUser is null)
            {
                throw new EWException("Không có profile, vui lòng thử lại");
            }
            currentUser.PhoneNumber = profile.PhoneNumber;
            currentProfile.Address = profile.Address;
            currentProfile.Github = profile.Github;
            currentProfile.Linkedin = profile.Linkedin;
            currentProfile.PhoneNumber = profile.PhoneNumber;
            currentProfile.EmailContact = profile.EmailContact;
            currentProfile.Objective = profile.Objective;
            currentProfile.Skills = profile.Skills;
            currentProfile.IsOpenForWork = profile.IsOpenForWork;
            _unitOfWork.Repository<User>().Update(currentUser);
            _unitOfWork.Repository<Profile>().Update(currentProfile);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
