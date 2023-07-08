using EW.Commons.Constaints;
using EW.Commons.Enums;
using EW.Commons.Exceptions;
using EW.Commons.Helpers;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Constracts;

namespace EW.Services.Business
{
    public class RecruiterService : IRecruiterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        public RecruiterService(
            IUnitOfWork unitOfWork, 
            IUserService userService
        )
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public async Task<bool> AddNewRecruiter(RegisterRecruiterModel model)
        {
            var exist = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Email == model.Email || model.PhoneNumber == item.PhoneNumber);
            if (exist is null)
            {
                _unitOfWork.BeginTransaction();
                var newCompany = new Company
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    CompanyName = model.CompanyName,
                    Address = model.Address,
                    TaxNumber = model.TaxNumber,
                    Country = Constaints.COUNTRY_DEFAULT,
                    Description = Constaints.STRING_BLANK,
                    CompanyType = ECompanyType.Product,
                    TeamSize = ETeamSize.ZeroTo50,
                    Status = EStatusRecruiter.Pending,
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now,
                    AvatarUrl = Constaints.STRING_BLANK,
                    Featured = false,
                };
                await _unitOfWork.Repository<Company>().AddAsync(newCompany);
                var resultAddCompany = await _unitOfWork.SaveChangeAsync();

                var firstAccountOfCompany = new User
                {
                    FullName = model.FullName,
                    Username = model.Username,
                    Password = model.Password,
                    CoverLetter = Constaints.STRING_BLANK,
                    UpdatedDate = DateTimeOffset.Now,
                    CreatedDate = DateTimeOffset.Now,
                    ImageUrl = Constaints.STRING_BLANK,
                    PhoneNumber = model.PhoneNumber,
                    RoleId = (long)ERole.ID_Business,
                    IsActive = false,
                    Email = model.Email,
                    TokenResetPassword = MyRandom.RandomString(30)
                };

                if (await _userService.GetUser(new User { Username = model.Username, Email = model.Email }) is not null)
                {
                    _unitOfWork.RollBack();
                    throw new EWException("Username hoặc email này đã đăng ký, vui lòng thử lại");
                }
                var resultAddFirstAccount = await _userService.Register(firstAccountOfCompany);
                if (resultAddCompany == false || resultAddFirstAccount == false)
                {
                    _unitOfWork.RollBack();
                    throw new EWException("Không thể thêm tài khoản hoặc công ty này");
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
                    throw new EWException("Không thể khởi tạo tài khoản này");
                }
            }
            throw new EWException("Username hoặc email này đã đăng ký, vui lòng thử lại");
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

            }).OrderByDescending(r => r.CreatedDate).ToList();
        }

        public async Task<bool> AssignUserToCompany(AddNewRecruiterAccountModel model)
        {
            var exist = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == model.Username || item.Email == model.Email || item.PhoneNumber == model.PhoneNumber);
            if (exist is not null)
                throw new EWException("Tài khoản này đã tồn tại, vui lòng thử lại");
            _unitOfWork.BeginTransaction();
            var newRecruiter = new User
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
                Email = model.Email,
                TokenResetPassword = MyRandom.RandomString(30)
            };
            var resultAdded = await _userService.Register(newRecruiter);
            if (resultAdded == false)
            {
                _unitOfWork.RollBack();
                throw new EWException("Không thể đăng ký tài khoản này");
            }
            var userAdded = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(item => item.Username == model.Username && item.Email == model.Email && item.PhoneNumber == model.PhoneNumber);
            var companyCurrent = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == model.CompanyId);
            if (userAdded is null || companyCurrent is null)
            {
                _unitOfWork.RollBack();
                throw new EWException("Không thể đăng ký tài khoản này");
            }
            var newAsign = new Recruiter
            {
                UserId = userAdded.Id,
                CompanyId = companyCurrent.Id,
                Position = model.Position,
                UpdatedDate = DateTimeOffset.Now,
                CreatedDate = DateTimeOffset.Now,
            };
            await _unitOfWork.Repository<Recruiter>().AddAsync(newAsign);
            var resultAssign = await _unitOfWork.SaveChangeAsync();

            if (resultAdded == false)
            {
                _unitOfWork.RollBack();
                throw new EWException("Không thể đăng ký tài khoản này");
            }
            _unitOfWork.Commit();
            return true;
        }

        public async Task<RecruiterViewModel> GetRecruiterByUser(User model)
        {
            var data = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(item => item.User.Username == model.Username && item.User.Email == model.Email, "User,Company");
            return new RecruiterViewModel
            {
                Id = data.UserId,
                Username = data.User.Username,
                FullName = data.User.FullName,
                PhoneNumber = data.User.PhoneNumber,
                Company = data.Company,
                Position = data.Position,
                Email = data.User.Email,
                CreatedDate = data.CreatedDate,
                UpdatedDate = data.UpdatedDate,
                IsActive = data.User.IsActive
            };
        }

        public async Task<IEnumerable<RecruiterViewModel>> GetRecruitersByCompany(Company company)
        {
            var data = await _unitOfWork.Repository<Recruiter>().GetAsync(item => item.CompanyId == company.Id, "User,Company");
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

            }).OrderByDescending(r => r.CreatedDate).ToList();
        }
    }
}
