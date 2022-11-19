﻿using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(IUserService userService, ILogger<ProfileController> logger)
        {
            _userService = userService;
            _logger = logger;
        }


        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile()
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = User.Identity.Name });
                result.Data = new UserProfileViewModel
                {
                    Experences = (List<UserExperence>)user.Experences,
                    CVs = (List<UserCV>)user.CVs,
                    CoverLetter = user.CoverLetter,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }


        [HttpPut("update-cover-letter")]
        public async Task<IActionResult> UpdateCoverLetter(UpdateCoverLetterModel model)
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = User.Identity.Name });
                if(user == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Cập nhật thư giới thiệu thất bại";
                } 
                else
                {
                    user.CoverLetter = model.CoverLetter;
                    
                    var updateResult = await _userService.UpdateUser(user);
                    result.IsSuccess = updateResult;
                    if (updateResult)
                        result.Message = "Cập nhật thư giới thiệu thành công";
                    else
                        result.Message = "Cập nhật thư giới thiệu thất bại";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }
    }
}
