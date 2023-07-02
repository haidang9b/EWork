using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Constracts;

namespace EW.Services.Business
{
    public class RecruitmentPostService : IRecruitmentPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        public RecruitmentPostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RecruitmentPost> Add(RecruitmentPost model)
        {
            model.UpdatedDate = DateTime.Now;
            model.CreatedDate = DateTime.Now;
            await _unitOfWork.Repository<RecruitmentPost>().AddAsync(model);
            if (await _unitOfWork.SaveChangeAsync() == false)
                throw new Exception("Thêm bài viết thất bại");
            return model;
        }

        public async Task<bool> Delete(RecruitmentPost model)
        {
            var exist = await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.Id);
            _unitOfWork.Repository<RecruitmentPost>().Delete(exist);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<RecruitmentPost>> GetAll()
        {
            return await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync("Company,UpdatedByUser");
        }

        public async Task<RecruitmentPost> GetRecruitmentPost(RecruitmentPost model)
        {
            return await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.Id 
                            || item.JobTitle == model.JobTitle
                            || item.JobDescription == model.JobDescription 
                            || item.CreatedDate == model.CreatedDate 
                            || item.UpdatedBy == model.UpdatedBy, "Company,UpdatedByUser");
        }

        public async Task<RecruitmentPost> GetRecruitmentPostForDetail(RecruitmentPost model)
        {
            return await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.Id, "Company");
        }

        public async Task<IEnumerable<RecruitmentPost>> GetRecruitmentPostsByCompany(Company company)
        {
            return await _unitOfWork.Repository<RecruitmentPost>().GetAsync(item => item.CompanyId == company.Id);
        }

        public async Task<IEnumerable<RecruitmentPost>> GetRecruitmentPostsByUser(User user)
        {
            var recruitmentPosts = await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync("Company,UpdatedByUser");
            
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
            return recruitmentPosts.OrderByDescending(item => item.CreatedDate);
        }

        public async Task<RecruitmentPost> GetRecruitmentSpecific(RecruitmentPost model)
        {
           return await _unitOfWork.Repository<RecruitmentPost>().FirstOrDefaultAsync(item => item.Id == model.Id 
                            && item.JobTitle == model.JobTitle
                            && item.JobDescription == model.JobDescription
                            && item.CreatedDate == model.CreatedDate
                            && item.UpdatedDate == model.UpdatedDate
                            && item.UpdatedBy == model.UpdatedBy, "Company,UpdatedByUser");
        }

        public async Task<bool> Update(RecruitmentPost model)
        {
            model.UpdatedDate = DateTime.Now;
            _unitOfWork.Repository<RecruitmentPost>().Update(model);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
