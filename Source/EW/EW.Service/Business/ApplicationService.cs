using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Constracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class ApplicationService : IApplicationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRecruitmentPostService _recruitmentPostService;

        public ApplicationService(IUnitOfWork unitOfWork, IRecruitmentPostService recruitmentPostService)
        {
            _unitOfWork = unitOfWork;
            _recruitmentPostService = recruitmentPostService;
        }

        public async Task<Application> Add(AddApplicationModel model)
        {
            var user = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Id == model.UserId);
            var recruitmentPost = await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.RecruitmentPostId);
            var cvApply = await _unitOfWork.Repository<UserCV>().FirstOrDefaultAsync(item => item.Id == model.UserCVId, "User");
            if(recruitmentPost == null)
            {
                throw new Exception("Bài viết không tồn tại");
            }

            if(cvApply == null)
            {
                throw new Exception("CV không tồn tại");
            }

            if(user.Id != cvApply.UserId)
            {
                throw new Exception("Người dùng không sở hữu cv này");
            }
            var existApplied = await _unitOfWork.Repository<Application>().FirstOrDefaultAsync(item => item.RecruitmentPostId == model.RecruitmentPostId && item.UserCV.UserId == user.Id);
            if (existApplied != null) 
            {
                throw new Exception("Yêu cầu này đã tồn tại, vui lòng kiểm tra lại");
            }
           
            var newApplication = new Application
            {
                UserCVId = model.UserCVId,
                RecruitmentPostId = model.RecruitmentPostId,
                CoverLetter = model.CoverLetter,
                Description = "",
                Status = model.Status,
                CreatedDate = DateTimeOffset.Now,
                UpdatedDate = DateTimeOffset.Now,
            };
            user.CoverLetter = model.CoverLetter;
            _unitOfWork.Repository<User>().Update(user);
            await _unitOfWork.Repository<Application>().AddAsync(newApplication);
            if(!(await _unitOfWork.SaveChangeAsync()))
            {
                throw new Exception("Không thể ứng tuyển");
            }
            return newApplication;
        }

        public async Task<IEnumerable<AppliedForBusinessViewModel>> GetAppliedsForBusiness(User user)
        {
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username);
            if (currentUser == null)
            {
                throw new Exception("Không tồn tại người dùng này");
            }
            var posts = await _recruitmentPostService.GetRecruitmentPostsByUser(currentUser);
            var postIds = posts.Select(item => item.Id).ToList();
            var users = await _unitOfWork.Repository<User>().GetAllAsync();
            var applications = await _unitOfWork.Repository<Application>().GetAsync(item => postIds.Contains(item.RecruitmentPostId), "RecruitmentPost,UserCV");
            var responseData = new List<AppliedForBusinessViewModel>();
            foreach(var application in applications)
            {
                var applicationUser = users.FirstOrDefault(item => item.Id == application.UserCV.UserId);
                if (applicationUser == null)
                    continue;
                var userRow = new UserInforJobApplicationViewModel
                {
                    Id = applicationUser.Id,
                    FullName = applicationUser.FullName,
                    Email = applicationUser.Email,
                    PhoneNumber = applicationUser.PhoneNumber,
                };

                var cv = new CVInforJobApplicationViewModel
                {
                    UserCVId = application.UserCVId,
                    CVUrl = application.UserCV.CVUrl,
                    CVName = application.UserCV.CVName,
                };

                var post = new PostInforJobApplicationViewModel
                {
                    RecruitmentPostId = application.RecruitmentPostId,
                    JobTitle = application.RecruitmentPost.JobTitle,
                };
                var row = new AppliedForBusinessViewModel
                {
                    Id = application.Id,
                    User = userRow,
                    CV = cv,
                    Post = post,
                    Description = application.Description,
                    UpdatedDate = application.UpdatedDate,
                    CreatedDate = application.CreatedDate,
                    Status = application.Status
                };

                responseData.Add(row);
            }
            return responseData.OrderByDescending(item => item.CreatedDate);
        }

        public async Task<IEnumerable<Application>> GetByApplier(User user)
        {
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username);
            if(currentUser == null)
            {
                throw new Exception("Không tồn tại người dùng này");
            }
            return await _unitOfWork.Repository<Application>().GetAsync(item => item.UserCV.UserId == currentUser.Id);
        }

        public async Task<IEnumerable<JobAppliedViewModel>> GetJobsApplied(User user)
        {
            var currentUser = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == user.Username);
            if (currentUser == null)
            {
                throw new Exception("Không tồn tại người dùng này");
            }
            var applieds = await _unitOfWork.Repository<Application>().GetAsync(item => item.UserCV.UserId == currentUser.Id, "RecruitmentPost,UserCV");
            var companies = await _unitOfWork.Repository<Company>().GetAllAsync();
            return applieds.AsQueryable().Join(companies, apply => apply.RecruitmentPost.CompanyId, company => company.Id, (apply, company) => new JobAppliedViewModel
            {
                Id = apply.Id,
                RecruitmentPostId = apply.RecruitmentPostId,
                CompanyId = company.Id,
                CompanyName = company.CompanyName,
                CreatedDate = apply.CreatedDate,
                UpdatedDate = apply.UpdatedDate,
                Description = apply.Description,
                CVName = apply.UserCV.CVName,
                UserCVId = apply.UserCV.UserId,
                CVUrl = apply.UserCV.CVUrl,
                JobTitle = apply.RecruitmentPost.JobTitle,
                Status = apply.Status,
            }).ToList();
        }

        public async Task<bool> IsHasRole(ApplicationUserModel model)
        {
            var currentRecruiter = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(item => item.User.Username == model.Username, "Company");
            if (currentRecruiter == null)
                throw new Exception("Không tồn tại user này");
            var currentApplication = await _unitOfWork.Repository<Application>().FirstOrDefaultAsync(item => item.Id == model.ApplicationId);
            if (currentApplication == null)
                throw new Exception("Không tồn tại ứng tuyển này");
            var currentRecruitmentPost = await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == currentApplication.RecruitmentPostId);

            return currentRecruitmentPost.CompanyId == currentRecruiter.CompanyId;
        }

        public async Task<bool> Update(Application application)
        {
            var currentApplication = await _unitOfWork.Repository<Application>().FirstOrDefaultAsync(item => item.Id == application.Id);
            if (currentApplication == null)
                throw new Exception("Không tồn tại ứng tuyển này");
            currentApplication.UpdatedDate = DateTimeOffset.Now;
            currentApplication.Description = application.Description;
            currentApplication.Status = application.Status;
            _unitOfWork.Repository<Application>().Update(currentApplication);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
