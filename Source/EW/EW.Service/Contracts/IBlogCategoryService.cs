using EW.Domain.Entities;

namespace EW.Services.Contracts
{
    public interface IBlogCategoryService
    {
        Task<BlogCategory> Add(BlogCategory model);
        Task<BlogCategory> Update(BlogCategory model);
        Task<bool> Delete(BlogCategory model);
        Task<IEnumerable<BlogCategory>> GetAll();
    }
}
