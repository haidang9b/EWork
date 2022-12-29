using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Constracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class UserCVService : IUserCVService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserCVService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UserCV> AddCV(UserCV model)
        {
            model.UpdatedDate = DateTimeOffset.Now;
            model.CreatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<UserCV>().AddAsync(model);
            if (await _unitOfWork.SaveChangeAsync() == false)
                throw new Exception("Thêm cv thất bại");
            return model;
        }

        public async Task<UserCV> GetUserCVByInfo(UserCV model)
        {
            return await _unitOfWork.Repository<UserCV>().FirstOrDefaultAsync(item => item.Id == model.Id || item.CVUrl == model.CVUrl);
        }

        public async Task<IEnumerable<UserCV>> GetUserCVsByUser(User model)
        {
            return await _unitOfWork.Repository<UserCV>().GetAsync(item => item.UserId == model.Id);
        }

        public async Task<bool> RemoveCV(UserCV model)
        {
            _unitOfWork.Repository<UserCV>().Delete(model);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}
