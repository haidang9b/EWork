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
        private readonly IBlogService _blogService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private string Username => User.FindFirstValue(ClaimTypes.NameIdentifier);
        private readonly ApiResult _apiResult;

        public BlogsController(
            IBlogService blogService,
            IUserService userService,
            IMapper mapper
        )
        {
            _blogService = blogService;
            _userService = userService;
            _mapper = mapper;
            _apiResult = new();
        }

        /// <summary>
        /// Get all blog
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {

            var data = await _blogService.GetAll();
            _apiResult.Data = _mapper.Map<IEnumerable<BlogDetailViewModel>>(data);
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
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

            var data = await _blogService.Get(id);
            if (data is null)
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Không tồn tại bài viết này";
            }
            else
            {
                _apiResult.Data = _mapper.Map<BlogDetailViewModel>(data);
                _apiResult.Message = "Lấy dữ liệu thành công";
            }

            return Ok(_apiResult);
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

            var user = await _userService.GetUser(new User { Username = Username });
            var newBlog = new Blog
            {
                Title = model.Title,
                Content = model.Content,
                UserId = user.Id,
                BlogCategoryId = model.BlogCategoryId,

            };
            await _blogService.Add(newBlog);
            var data = await _blogService.Get(newBlog.Id);
            _apiResult.Data = _mapper.Map<BlogDetailViewModel>(data);
            _apiResult.Message = "Thêm bài viết thành công";

            return Ok(_apiResult);
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

            if (await _blogService.Delete(new Blog { Id = id }))
            {
                _apiResult.Data = new Blog
                {
                    Id = id
                };
                _apiResult.Message = "Xóa thành công bài viết";
            }
            else
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Xóa bài viết thất bại";
            }

            return Ok(_apiResult);
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

            await _blogService.Update(model);
            var data = await _blogService.Get(model.Id);
            _apiResult.Data = _mapper.Map<BlogDetailViewModel>(data);
            _apiResult.Message = "Cập nhật bài viết thành công";

            return Ok(_apiResult);
        }
    }
}
