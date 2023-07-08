using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;

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
            if (exist is not null)
            {
                throw new EWException("Đã tồn tại danh mục này rồi, vui lòng kiểm tra lại");
            }
            model.CreatedDate = DateTimeOffset.Now;
            model.UpdatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<BlogCategory>().AddAsync(model);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new EWException("Không thể thêm danh mục này");
            return model;
        }

        public async Task<bool> Delete(BlogCategory model)
        {
            var exist = await _unitOfWork.Repository<BlogCategory>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (exist is null) 
            {
                throw new EWException("Không tồn tại danh mục này");
            }
            _unitOfWork.Repository<BlogCategory>().Delete(exist);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<BlogCategory>> GetAll()
        {
            var blogCategories = await _unitOfWork.Repository<BlogCategory>().GetAllAsync();
            return blogCategories.OrderByDescending(item => item.CreatedDate).ToList();
        }

        public async Task<BlogCategory> Update(BlogCategory model)
        {
            var exist = await _unitOfWork.Repository<BlogCategory>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (exist is null)
            {
                throw new EWException("Không tồn tại danh mục này");
            }
            exist.UpdatedDate = DateTimeOffset.Now;
            exist.Name = model.Name;
            exist.Description = model.Description;
            _unitOfWork.Repository<BlogCategory>().Update(exist);
            if (!(await _unitOfWork.SaveChangeAsync()))
                throw new EWException("Không thể cập nhật danh mục này");
            return exist;
        }
    }
}
