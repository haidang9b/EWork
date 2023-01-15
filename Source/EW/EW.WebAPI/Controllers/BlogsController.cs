using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Blogs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly ILogger<BlogsController> _logger;
        private readonly IBlogService _blogService;
        private readonly IUserService _userService;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public BlogsController(ILogger<BlogsController> logger, IBlogService blogService, IUserService userService)
        {
            _logger = logger;
            _blogService = blogService;
            _userService = userService;
        }

        /// <summary>
        /// Get all blog
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index() 
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _blogService.GetAll();
                result.Message = "Lấy dữ liệu thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Get Detail Blog by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Blog</returns>
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var result = new ApiResult();
            try
            {
                var data = await _blogService.Get(id);
                if(data == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không tồn tại bài viết này";
                }
                else
                {
                    result.Data = data;
                    result.Message = "Lấy dữ liệu thành công";
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }
        /// <summary>
        /// Add new blog
        /// </summary>
        /// <param name="model">AddBlogModel</param>
        /// <returns>Blog</returns>
        [Authorize(Roles = "Faculty")]
        [HttpPost]
        public async Task<IActionResult> Post(AddBlogModel model)
        {
            var result = new ApiResult();
            try
            {
                var user = await _userService.GetUser(new User { Username = _username });
                var newBlog = new Blog
                {
                    Title = model.Title,
                    Content = model.Content,
                    CreatedBy = user.Id,
                    BlogCategoryId = model.BlogCategoryId
                };
                result.Data = await _blogService.Add(newBlog);
                result.Message = "Thêm bài viết thành công";
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
        /// <summary>
        /// Delete blog by id
        /// </summary>
        /// <param name="id">long</param>
        /// <returns></returns>
        [Authorize(Roles = "Faculty")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = new ApiResult();
            try
            {
                if(await _blogService.Delete(new Blog { Id = id}))
                {
                    result.Data = new Blog
                    {
                        Id = id
                    };
                    result.Message = "Xóa thành công bài viết";
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Xóa bài viết thất bại";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
        /// <summary>
        /// Update blog exist
        /// </summary>
        /// <param name="model">Blog</param>
        /// <returns>Blog</returns>
        [Authorize(Roles = "Faculty")]
        [HttpPut]
        public async Task<IActionResult> Put(Blog model)
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _blogService.Update(model);
                result.Message = "Cập nhật bài viết thành công";
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
