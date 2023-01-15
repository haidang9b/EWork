using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
