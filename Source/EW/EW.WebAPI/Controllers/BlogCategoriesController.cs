using EW.Domain.Entities;
using EW.Services.Contracts;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCategoriesController : ControllerBase
    {
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly ApiResult _apiResult;

        public BlogCategoriesController(
            IBlogCategoryService blogCategoryService
            )
        {
            _blogCategoryService = blogCategoryService;
            _apiResult = new ApiResult();
        }

        /// <summary>
        /// Get all blog category
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            _apiResult.Data = await _blogCategoryService.GetAll();
            _apiResult.Message = "Lấy dữ liệu thành công";

            return Ok(_apiResult);
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
            _apiResult.Data = await _blogCategoryService.Add(model);
            _apiResult.Message = "Thêm danh mục mới thành công";
            return Ok(_apiResult);
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
            if (await _blogCategoryService.Delete(new BlogCategory { Id = id }))
            {
                _apiResult.Data = new Blog
                {
                    Id = id
                };
                _apiResult.Message = "Xóa thành công danh mục";
            }
            else
            {
                _apiResult.IsSuccess = false;
                _apiResult.Message = "Xóa danh mục thất bại";
            }
            return Ok(_apiResult);
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
            _apiResult.Data = await _blogCategoryService.Update(model);
            _apiResult.Message = "Cập nhật danh mục thành công";
            return Ok(_apiResult);
        }
    }
}
