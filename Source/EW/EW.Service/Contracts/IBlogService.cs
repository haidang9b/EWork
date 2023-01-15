using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Contracts
{
    public interface IBlogService
    {
        Task<IEnumerable<Blog>> GetAll();
        Task<Blog> Add(Blog blog);
        Task<Blog> Update(Blog blog);
        Task<bool> Delete(Blog blog);
    }
}
