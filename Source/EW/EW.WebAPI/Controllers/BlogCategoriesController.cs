using EW.Domain.Entities;
using EW.Services.Business;
using EW.Services.Constracts;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using EW.WebAPI.Models.Models.Blogs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCategoriesController : ControllerBase
    {
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly ILogger<BlogCategoriesController> _logger;

        public BlogCategoriesController(IBlogCategoryService blogCategoryService, ILogger<BlogCategoriesController> logger)
        {
            _blogCategoryService = blogCategoryService;
            _logger = logger;
        }

        /// <summary>
        /// Get all blog category
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _blogCategoryService.GetAll();
                result.Message = "Lấy dữ liệu thành công";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError();
            }
            return Ok(result);
        }

        /// <summary>
        /// Add new blog category
        /// </summary>
        /// <param name="model">AddBlogModel</param>
        /// <returns>Blog</returns>
        [Authorize(Roles = "Faculty")]
        [HttpPost]
        public async Task<IActionResult> Post(BlogCategory model)
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _blogCategoryService.Add(model);
                result.Message = "Thêm danh mục mới thành công";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                result.InternalError(ex.Message);
            }
            return Ok(result);
        }
        /// <summary>
        /// Delete blog category by id
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
                if (await _blogCategoryService.Delete(new BlogCategory { Id = id }))
                {
                    result.Data = new Blog
                    {
                        Id = id
                    };
                    result.Message = "Xóa thành công danh mục";
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Xóa danh mục thất bại";
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
        /// Update blog category exist
        /// </summary>
        /// <param name="model">Blog</param>
        /// <returns>Blog</returns>
        [Authorize(Roles = "Faculty")]
        [HttpPut]
        public async Task<IActionResult> Put(BlogCategory model)
        {
            var result = new ApiResult();
            try
            {
                result.Data = await _blogCategoryService.Update(model);
                result.Message = "Cập nhật danh mục thành công";
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
