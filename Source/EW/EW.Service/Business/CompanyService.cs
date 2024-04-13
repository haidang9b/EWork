using EW.Commons.Constaints;
using EW.Commons.Enums;
using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
using EW.Repository;
using EW.Services.Constracts;


namespace EW.Services.Business;

public class CompanyService : ICompanyService
{
    private readonly IUnitOfWork _unitOfWork;

    public CompanyService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Company> Find(Company company)
    {
        return await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Email == company.Email || company.PhoneNumber == item.PhoneNumber || company.Id == item.Id);
    }

    public async Task<IEnumerable<Company>> GetCompanies()
    {
        return await _unitOfWork.Repository<Company>().GetAllAsync();
    }

    public async Task<Company> GetCompanyByUser(User user)
    {
        var exist = await _unitOfWork.Repository<User>().FirstOrDefaultAsync(u => u.Id == user.Id);
        var companyRecruiter = await _unitOfWork.Repository<Recruiter>().FirstOrDefaultAsync(c => c.UserId == exist.Id, nameof(Recruiter.Company));
        return companyRecruiter.Company;
    }

    public async Task<bool> UpdateInformationCompany(UpdateCompanyModel model)
    {
        var existCompany = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == model.Id)
                                ?? throw new EWException("Công ty này không tồn tại, vui lòng kiểm tra lại");

        existCompany.CompanyName = model.CompanyName;
        existCompany.Address = model.Address;
        existCompany.Status = model.Status;
        existCompany.UpdatedDate = DateTimeOffset.Now;
        existCompany.TaxNumber = model.TaxNumber;
        existCompany.CompanyType = model.CompanyType;
        existCompany.TeamSize = model.TeamSize;
        existCompany.Country = model.Country;
        existCompany.Description = model.Description;
        existCompany.Featured = model.Featured;
        _unitOfWork.Repository<Company>().Update(existCompany);
        return await _unitOfWork.SaveChangeAsync();
    }

    public async Task<Company> GetCompany(Company model)
    {
        return await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == model.Id || model.Email == item.Email);
    }

    public async Task<Company> AddCompany(Company model)
    {
        var newCompany = new Company
        {
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            CompanyName = model.CompanyName,
            Address = model.Address,
            Status = EStatusRecruiter.Pending,
            UpdatedDate = DateTimeOffset.Now,
            CreatedDate = DateTimeOffset.Now,
            TaxNumber = model.TaxNumber,
            AvatarUrl = Constaints.STRING_BLANK,
            Country = Constaints.COUNTRY_DEFAULT,
            TeamSize = ETeamSize.ZeroTo50,
            CompanyType = ECompanyType.Product,
            Description = Constaints.COUNTRY_DEFAULT,
            Featured = model.Featured,
        };
        await _unitOfWork.Repository<Company>().AddAsync(newCompany);
        if (!await _unitOfWork.SaveChangeAsync())
            throw new EWException("Thêm công ty mới thất bại");
        return newCompany;
    }

    public async Task<bool> UploadAvatarCompany(Company company)
    {
        var exist = await _unitOfWork.Repository<Company>().FirstOrDefaultAsync(item => item.Id == company.Id);
        exist.AvatarUrl = company.AvatarUrl;
        exist.UpdatedDate = DateTimeOffset.Now;
        _unitOfWork.Repository<Company>().Update(exist);
        return await _unitOfWork.SaveChangeAsync();
    }

    public async Task<IEnumerable<TopComapnyModel>> GetTopCompanies()
    {
        var companies = await _unitOfWork.Repository<Company>().GetAsync(item => item.Status == EStatusRecruiter.Active);
        var recruitmentPosts = await _unitOfWork.Repository<RecruitmentPost>().GetAllAsync();
        var result = new List<TopComapnyModel>();
        foreach (var company in companies)
        {
            var JobsHiring = recruitmentPosts.Where(item => item.CompanyId == company.Id).ToList();
            result.Add(new TopComapnyModel
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                AvatarUrl = company.AvatarUrl,
                JobsHiring = JobsHiring.Count,
                CompanyType = company.CompanyType,
                Featured = company.Featured,
            });
        }
        return result;
    }
}
