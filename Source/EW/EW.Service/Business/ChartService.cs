using EW.Domain.Entities;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Contracts;

namespace EW.Services.Business
{
    public class ChartService : IChartService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ChartService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<NumberApplicationViewModel>> GetNumberApplication()
        {
            var applications = await _unitOfWork.Repository<Application>().GetAllAsync();
            return applications.GroupBy(item => new { item.Status }).Select(row => new NumberApplicationViewModel
            {
                Type = row.Key.Status,
                Number = row.Count(x => x.Status == row.Key.Status)
            });
        }

        public async Task<IEnumerable<ChartResultViewModel>> GetNumberRecruitmentPost()
        {
            var recruitmentPosts = await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync();
            return recruitmentPosts
                .GroupBy(item => new { item.CreatedDate.Year, item.CreatedDate.Month, item.CreatedDate.Day })
                .Select(row => new ChartResultViewModel
                {
                    Label = $"{row.Key.Day}/{row.Key.Month}/{row.Key.Year}",
                    Value = row.Count(),
                }).Take(10).ToList();
        }

        public async Task<IEnumerable<ChartResultViewModel>> GetRankingTechStacks(string[] techStacks)
        {
            var result = new List<ChartResultViewModel>();
            var recruitmentPosts = await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync();
            var techOnPosts = recruitmentPosts.Select(item => item.TechStacks).ToList();
            for (var i = 0; i < techStacks.Length; i++)
            {
                result.Add(new ChartResultViewModel
                {
                    Label = techStacks[i],
                    Value = techOnPosts.Count(item => item.Contains(techStacks[i]))
                });
            }
            return result.OrderByDescending(item => item.Value);
        }
    }
}
