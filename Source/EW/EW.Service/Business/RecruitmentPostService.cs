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
    public class RecruitmentPostService : IRecruitmentPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        public RecruitmentPostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Add(RecruitmentPost model)
        {
            model.UpdatedDate = DateTime.Now;
            model.CreatedDate = DateTime.Now;
            await _unitOfWork.Repository<RecruitmentPost>().AddAsync(model);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<RecruitmentPost>> GetAll()
        {
            return await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync("Company,User");
        }

        public async Task<RecruitmentPost> GetRecruitment(RecruitmentPost model)
        {
            return await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.Id 
                            || item.JobTitle == model.JobTitle
                            || item.JobDescription == model.JobDescription 
                            || item.CreatedDate == model.CreatedDate 
                            || item.UpdatedBy == model.UpdatedBy, "Company,User");
        }

        public async Task<IEnumerable<RecruitmentPost>> GetRecruitmentPostsByUser(User user)
        {
            var recruitmentPosts = await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync();
            
            // if user is business, load only data recruitment post of user's company
            if(user.RoleId == (long)ERole.ID_Business)
            {
                var recruiter = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(item => item.UserId == user.Id, "Company");

                if(recruiter == null)
                {
                    return new List<RecruitmentPost>();
                }
                recruitmentPosts = recruitmentPosts.Where(item => item.CompanyId == recruiter.CompanyId).ToList();
            }
            // else user is Faculty, load all data
            return recruitmentPosts;
        }

        public async Task<bool> Update(RecruitmentPost model)
        {
            model.UpdatedDate = DateTime.Now;
            _unitOfWork.Repository<RecruitmentPost>().Update(model);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
