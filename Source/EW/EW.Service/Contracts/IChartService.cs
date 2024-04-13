using EW.Domain.ViewModels;

namespace EW.Services.Contracts;

public interface IChartService
{
    Task<IEnumerable<NumberApplicationViewModel>> GetNumberApplication();

    Task<IEnumerable<ChartResultViewModel>> GetNumberRecruitmentPost();

    Task<IEnumerable<ChartResultViewModel>> GetRankingTechStacks(string[] techStacks);
}
