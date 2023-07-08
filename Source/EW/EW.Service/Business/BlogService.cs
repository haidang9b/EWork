using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;

namespace EW.Services.Business
{
    public class BlogService : IBlogService
    {
        private readonly IUnitOfWork _unitOfWork;
        public BlogService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Blog> Add(Blog blog)
        {
            blog.CreatedDate = DateTimeOffset.Now;
            blog.UpdatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<Blog>().AddAsync(blog);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new EWException("Không thể thêm danh mục này");
            return blog;
        }

        public async Task<bool> Delete(Blog blog)
        {
            var exist = await _unitOfWork.Repository<Blog>().FirstOrDefaultAsync(item => item.Id == blog.Id)
                            ?? throw new EWException("Không tồn tại bài viết này, vui lòng kiểm tra lại");
            _unitOfWork.Repository<Blog>().Delete(exist);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<Blog> Get(long id)
        {
            return await _unitOfWork.Repository<Blog>().FirstOrDefaultAsync(item => item.Id == id, "BlogCategory,User");
        }

        public async Task<IEnumerable<Blog>> GetAll()
        {
            var blogs = await _unitOfWork.Repository<Blog>().GetAllAsync("BlogCategory,User");
            return blogs.OrderByDescending(item => item.CreatedDate).ToList();
        }

        public async Task<Blog> Update(Blog blog)
        {
            var exist = await _unitOfWork.Repository<Blog>().FirstOrDefaultAsync(item => item.Id == blog.Id) 
                            ?? throw new EWException("Không tồn tại bài viết này, vui lòng kiểm tra lại");

            exist.Title = blog.Title;
            exist.Content = blog.Content;
            exist.BlogCategoryId = blog.BlogCategoryId;
            exist.UpdatedDate = DateTimeOffset.Now;
            _unitOfWork.Repository<Blog>().Update(exist);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new EWException("Không thể cập nhật bài viết này");
            return exist;
        }
    }
}
