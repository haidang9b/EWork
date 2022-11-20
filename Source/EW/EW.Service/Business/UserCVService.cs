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

        public async Task<bool> AddCV(UserCV model)
        {
            model.UpdatedDate = DateTimeOffset.Now;
            model.CreatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<UserCV>().AddAsync(model);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<IEnumerable<UserCV>> GetUserCVsByUser(User model)
        {
            return await _unitOfWork.Repository<UserCV>().GetAsync(item => item.UserId == model.Id);
        }

        public Task<bool> RemoveCV(UserCV model)
        {
            throw new NotImplementedException();
        }
    }
}
