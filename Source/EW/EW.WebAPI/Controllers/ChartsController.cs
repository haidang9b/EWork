using EW.Services.Contracts;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly IChartService _chartService;
        private readonly ILogger<ChartsController> _logger;
        public ChartsController(IChartService chartService, ILogger<ChartsController> logger)
        {
            _chartService = chartService;
            _logger = logger;
        }
        /// <summary>
        /// Get number apply per status
        /// </summary>
        /// <returns></returns>
        [HttpGet("application")]
        [Authorize]
        public async Task<IActionResult> GetApplication()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _chartService.GetNumberApplication();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }

        /// <summary>
        /// Get number post per day
        /// </summary>
        /// <returns></returns>
        [HttpGet("post")]
        [Authorize]
        public async Task<IActionResult> GetPost()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _chartService.GetNumberRecruitmentPost();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
        /// <summary>
        /// Get ranking teck stack for jobs looking
        /// </summary>
        /// <param name="techStacks"></param>
        /// <returns></returns>
        [HttpPost("ranking-tech")]
        [Authorize]
        public async Task<IActionResult> GetRanking(string[] techStacks)
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _chartService.GetRankingTechStacks(techStacks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
    }
}
