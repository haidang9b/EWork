﻿using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UsersController> _logger;
        private readonly ITokenService _tokenService;
        public UsersController(IUserService userService, ILogger<UsersController> logger, ITokenService tokenService)
        {
            _userService = userService;
            _logger = logger;
            _tokenService = tokenService;
        }
        // GET: api/<UsersController>
        [Authorize(Roles = "Faculty")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _userService.GetUsers();
            }
            catch (Exception e)
            {
                result.InternalError();
                _logger.LogError(e.Message);
            }
            return Ok(result);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            return Ok(value);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("roles")]
        [Authorize(Roles = "Faculty")]
        public async Task<IActionResult> GetRoles()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _userService.GetRoles();
                result.IsSuccess = true;
                result.Message = "Lấy các quyền thành công";
            }
            catch(Exception ex)
            {

                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }
        [Authorize]
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
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /*[HttpPut("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordModel model)
        {
            var result = new ApiResult();
            try
            {

            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                result.InternalError();
            }

            return Ok(result);
        }*/
    }
}
