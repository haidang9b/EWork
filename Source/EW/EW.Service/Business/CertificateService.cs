using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;

namespace EW.Services.Business;

public class CertificateService : ICertificateService
{
    private readonly IUnitOfWork _unitOfWork;

    public CertificateService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<Certificate> Add(Certificate model)
    {
        model.CreatedDate = DateTimeOffset.Now;
        model.UpdatedDate = DateTimeOffset.Now;
        await _unitOfWork.Repository<Certificate>().AddAsync(model);
        if (!await _unitOfWork.SaveChangeAsync())
            throw new EWException("Không thể thêm chứng chỉ này");
        return model;
    }

    public async Task<bool> Delete(Certificate model)
    {
        var currentCertificate = await _unitOfWork.Repository<Certificate>().FirstOrDefaultAsync(item => item.Id == model.Id)
                                    ?? throw new EWException("Không tồn tại chứng chỉ này");
        _unitOfWork.Repository<Certificate>().Delete(currentCertificate);
        return await _unitOfWork.SaveChangeAsync();
    }

    public async Task<bool> Update(Certificate model)
    {
        var currentCertificate = await _unitOfWork.Repository<Certificate>().FirstOrDefaultAsync(item => item.Id == model.Id)
                                    ?? throw new EWException("Không tồn tại chứng chỉ này");
        currentCertificate.UpdatedDate = DateTimeOffset.Now;
        currentCertificate.Description = model.Description;
        currentCertificate.From = model.From;
        currentCertificate.To = model.To;
        currentCertificate.CertificateName = model.CertificateName;
        _unitOfWork.Repository<Certificate>().Update(currentCertificate);
        return await _unitOfWork.SaveChangeAsync();
    }
}
