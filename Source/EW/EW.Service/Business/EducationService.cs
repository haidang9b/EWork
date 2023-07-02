using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;

namespace EW.Services.Business
{
    public class EducationService : IEducationService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EducationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Education> Add(Education model)
        {
            model.CreatedDate = DateTimeOffset.Now;
            model.UpdatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<Education>().AddAsync(model);
            if (await _unitOfWork.SaveChangeAsync() == false)
                throw new Exception("Không thể thêm học vấn này");
            return model;
        }

        public async Task<bool> Delete(Education model)
        {
            var currentEducation = await _unitOfWork.Repository<Education>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (currentEducation == null)
            {
                throw new Exception("Không tồn tại học vấn này");
            }
            _unitOfWork.Repository<Education>().Delete(currentEducation);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> Update(Education model)
        {
            var currentEducation = await _unitOfWork.Repository<Education>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (currentEducation == null)
            {
                throw new Exception("Không tồn tại học vấn này");
            }
            currentEducation.UpdatedDate = DateTimeOffset.Now;
            currentEducation.Description = model.Description;
            currentEducation.From = model.From;
            currentEducation.To = model.To;
            currentEducation.OrgName = model.OrgName;
            _unitOfWork.Repository<Education>().Update(currentEducation);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
