using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IRecruitmentPostService
    {
        Task<RecruitmentPost> Add(RecruitmentPost model);
        Task<bool> Update(RecruitmentPost model);
        Task<IEnumerable<RecruitmentPost>> GetAll();
        Task<RecruitmentPost> GetRecruitmentPost(RecruitmentPost model);
        Task<RecruitmentPost> GetRecruitmentSpecific(RecruitmentPost model);
        Task<IEnumerable<RecruitmentPost>> GetRecruitmentPostsByUser(User user);
        Task<bool> Delete(RecruitmentPost model);
        Task<IEnumerable<RecruitmentPost>> GetRecruitmentPostsByCompany(Company company);
        Task<RecruitmentPost> GetRecruitmentPostForDetail(RecruitmentPost model);
    }
}
