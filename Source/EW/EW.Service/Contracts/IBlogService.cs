using EW.Domain.Entities;

namespace EW.Services.Contracts;

public interface IBlogService
{
    Task<IEnumerable<Blog>> GetAll();

    Task<Blog> Add(Blog blog);

    Task<Blog> Update(Blog blog);

    Task<bool> Delete(Blog blog);

    Task<Blog> Get(long id);
}
