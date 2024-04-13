using EW.Domain.Entities;

namespace EW.Services.Constracts;

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
