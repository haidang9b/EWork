﻿using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Constracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class ApplicationService : IApplicationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ApplicationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
            var newApplication = new Application
            {
                UserCVId = model.UserCVId,
                RecruitmentPostId = model.RecruitmentPostId,
                CoverLetter = model.CoverLetter,
                Description = "",
                Status = Commons.Enums.EApplicationStatus.ReceptionCV,
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
    }
}
