using EW.Services.Contracts;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChartsController : ControllerBase
{
    private readonly IChartService _chartService;
    private readonly ApiResult _apiResult;

    public ChartsController(
        IChartService chartService
    )
    {
        _chartService = chartService;
        _apiResult = new();
    }
    /// <summary>
    /// Get number apply per status
    /// </summary>
    /// <returns></returns>
    [HttpGet("application")]
    [Authorize]
    public async Task<IActionResult> GetApplication()
    {

        _apiResult.Data = await _chartService.GetNumberApplication();
        return Ok(_apiResult);
    }

    /// <summary>
    /// Get number post per day
    /// </summary>
    /// <returns></returns>
    [HttpGet("post")]
    [Authorize]
    public async Task<IActionResult> GetPost()
    {
        _apiResult.Data = await _chartService.GetNumberRecruitmentPost();
        return Ok(_apiResult);
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
        _apiResult.Data = await _chartService.GetRankingTechStacks(techStacks);
        return Ok(_apiResult);
    }
}
