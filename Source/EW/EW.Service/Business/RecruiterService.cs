using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
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
        private readonly IUserService _userService;
        public RecruiterService(IUnitOfWork unitOfWork, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public async Task<bool> AddNewRecruiter(RegisterRecruiterModel model)
        {
            var exist = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Email == model.Email || model.PhoneNumber == item.PhoneNumber);
            if(exist == null)
            {
                _unitOfWork.BeginTransaction();
                var newCompany = new Company
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    CompanyName = model.CompanyName,
                    Address = model.Address,
                    Status = EStatusRecruiter.Pending,
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now,
                };
                _unitOfWork.Repository<Company>().Add(newCompany);
                var resultAddCompany = await _unitOfWork.SaveChangeAsync();

                var firstAccountOfCompany = new User
                {
                    FullName = model.FullName,
                    Username = model.Username,
                    Password = model.Password,
                    CoverLetter = "",
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now,
                    ImageUrl = "",
                    PhoneNumber = model.PhoneNumber,
                    RoleId = (long)ERole.ID_Business,
                    IsActive = false,
                    Email = model.Email
                };

                if (await _userService.GetUser(new User { Username = model.Username, Email = model.Email }) != null) 
                {
                    _unitOfWork.RollBack();
                    return false;
                }
                var resultAddFirstAccount = await _userService.Register(firstAccountOfCompany);
                if(resultAddCompany == false || resultAddFirstAccount ==  false)
                {
                    _unitOfWork.RollBack();
                    return false;
                }

                var companyAdded = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(company => company.Email == newCompany.Email && company.PhoneNumber == newCompany.PhoneNumber);
                var accountAdded = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(user => user.Email == firstAccountOfCompany.Email && user.Username == firstAccountOfCompany.Username);
                var newRecruiter = new Recruiter
                {
                    UserId = accountAdded.Id,
                    CompanyId = companyAdded.Id,
                    User = accountAdded,
                    Company = companyAdded,
                    Position = model.Position,
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now,
                };
                await _unitOfWork.Repository<Recruiter>().AddAsync(newRecruiter);
                if (await _unitOfWork.SaveChangeAsync())
                {
                    _unitOfWork.Commit();
                    return true;
                }
                else
                {
                    _unitOfWork.RollBack();
                    return false;
                }
            }
            return false;
        }

        public async Task<Company> Find(Company company)
        {
            return await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Email == company.Email || company.PhoneNumber == item.PhoneNumber || company.Id == item.Id);
        }

        public async Task<IEnumerable<Company>> GetCompanies()
        {
            return await _unitOfWork.Repository<Company>().GetAllAsync();
        }

        public async Task<Company> GetCompanyByUser(User model)
        {
            var user = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(u => u.Id == model.Id);
            var companyRecruiter = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(c => c.UserId == user.Id, includeProperties: "Company");
            return companyRecruiter.Company;
        }

        public async Task<IEnumerable<RecruiterViewModel>> GetRecruiters()
        {
            var data = await _unitOfWork.Repository<Recruiter>().GetAllAsync("User,Company");
            return data.Select(item => new RecruiterViewModel
            {
                Id = item.UserId,
                Username = item.User.Username,
                FullName = item.User.FullName,
                PhoneNumber = item.User.PhoneNumber,
                Company = item.Company,
                Position = item.Position,
                Email = item.User.Email,
                CreatedDate = item.CreatedDate,
                UpdatedDate = item.UpdatedDate,
                IsActive = item.User.IsActive

            }).OrderByDescending(r => r.Company.Id).ToList();
        }

        public async Task<bool> UpdateInformationCompany(UpdateCompanyModel model)
        {
            var existCompany = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (existCompany == null)
                return false;
            existCompany.CompanyName = model.CompanyName;
            existCompany.Address = model.Address;
            existCompany.Status = model.Status;
            _unitOfWork.Repository<Company>().Update(existCompany);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<Company> GetCompany(Company model)
        {
            return await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == model.Id);
        }
    }
}
