using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class BlogCategoryService : IBlogCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        public BlogCategoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BlogCategory> Add(BlogCategory model)
        {
            var exist = await _unitOfWork.Repository<BlogCategory>().FirstOrDefaultAsync(item => item.Name == model.Name);
            if (exist != null)
            {
                throw new Exception("Đã tồn tại danh mục này rồi, vui lòng kiểm tra lại");
            }
            model.CreatedDate = DateTimeOffset.Now;
            model.UpdatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<BlogCategory>().AddAsync(model);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new Exception("Không thể thêm danh mục này");
            return model;
        }

        public async Task<bool> Delete(BlogCategory model)
        {
            var exist = await _unitOfWork.Repository<BlogCategory>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (exist == null) 
            {
                throw new Exception("Không tồn tại danh mục này");
            }
            _unitOfWork.Repository<BlogCategory>().Delete(exist);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<BlogCategory>> GetAll()
        {
            return await _unitOfWork.Repository<BlogCategory>().GetAllAsync();
        }

        public async Task<BlogCategory> Update(BlogCategory model)
        {
            var exist = await _unitOfWork.Repository<BlogCategory>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (exist == null)
            {
                throw new Exception("Không tồn tại danh mục này");
            }
            exist.UpdatedDate = DateTimeOffset.Now;
            exist.Name = model.Name;
            exist.Description = model.Description;
            _unitOfWork.Repository<BlogCategory>().Update(exist);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new Exception("Không thể cập nhật danh mục này");
            return exist;
        }
    }
}
