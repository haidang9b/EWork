using AutoMapper;
using EW.Domain.Entities;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Blogs;
using EW.WebAPI.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IMapper _mapper;
        private string _username => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public BlogsController(ILogger<BlogsController> logger, IBlogService blogService, IUserService userService, IMapper mapper)
        {
            _logger = logger;
            _blogService = blogService;
            _userService = userService;
            _mapper = mapper;
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
                var data = await _blogService.GetAll();
                result.Data = _mapper.Map<IEnumerable<BlogDetailViewModel>>(data);
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
                if(data is null)
                {
                    result.IsSuccess = false;
                    result.Message = "Không tồn tại bài viết này";
                }
                else
                {
                    result.Data = _mapper.Map<BlogDetailViewModel>(data);
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
                    UserId = user.Id,
                    BlogCategoryId = model.BlogCategoryId,
                    
                };
                await _blogService.Add(newBlog);
                var data = await _blogService.Get(newBlog.Id);
                result.Data = _mapper.Map<BlogDetailViewModel>(data);
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
                await _blogService.Update(model);
                var data = await _blogService.Get(model.Id);
                result.Data = _mapper.Map<BlogDetailViewModel>(data);
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
