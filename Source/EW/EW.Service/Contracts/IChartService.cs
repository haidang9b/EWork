using EW.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface IChartService
    {
        Task<IEnumerable<NumberApplicationViewModel>> GetNumberApplication();
        Task<IEnumerable<ChartResultViewModel>> GetNumberRecruitmentPost();
        Task<IEnumerable<ChartResultViewModel>> GetRankingTechStacks(string[] techStacks);
    }
}
