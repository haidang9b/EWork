using EW.Commons.Enums;
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
    public class RecruiterService : IRecruiterService
    {
        private readonly IUnitOfWork _unitOfWork;
        public RecruiterService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddNewRecruiter(Recruiter model)
        {
            var exist = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(item => item.Email == model.Email || model.PhoneNumber == item.PhoneNumber);
            if(exist == null)
            {
                _unitOfWork.Repository<Recruiter>().Add(new Recruiter
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    FullName = model.FullName,
                    Position = model.Position,
                    CompanyName = model.CompanyName,
                    Address = model.Address,
                    Status = EStatusRecruiter.Pending,
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now
                });
                return await _unitOfWork.SaveChangeAsync();
            }
            return false;
        }

        public async Task<Recruiter> Find(Recruiter recruiter)
        {
            return await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(item => item.Email == recruiter.Email || recruiter.PhoneNumber == item.PhoneNumber);
        }
    }
}
