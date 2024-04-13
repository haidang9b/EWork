using EW.Commons.Exceptions;
using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;

namespace EW.Services.Business;

public class WorkHistoryService : IWorkHistoryService
{
    private readonly IUnitOfWork _unitOfWork;

    public WorkHistoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<WorkHistory> Add(WorkHistory workHistory)
    {
        workHistory.CreatedDate = DateTimeOffset.Now;
        workHistory.UpdatedDate = DateTimeOffset.Now;
        await _unitOfWork.Repository<WorkHistory>().AddAsync(workHistory);
        if (!await _unitOfWork.SaveChangeAsync())
            throw new EWException("Không thể thêm kinh nghiệm làm việc này");
        return workHistory;
    }

    public async Task<bool> Delete(WorkHistory workHistory)
    {
        var currentWorkHistory = await _unitOfWork.Repository<WorkHistory>().FirstOrDefaultAsync(item => item.Id == workHistory.Id)
                                    ?? throw new EWException("Không tồn tại kinh nghiệm làm việc này");
        _unitOfWork.Repository<WorkHistory>().Delete(currentWorkHistory);
        return await _unitOfWork.SaveChangeAsync();

    }

    public async Task<bool> Update(WorkHistory workHistory)
    {
        var currentWorkHistory = await _unitOfWork.Repository<WorkHistory>().FirstOrDefaultAsync(item => item.Id == workHistory.Id)
                                    ?? throw new EWException("Không tồn tại kinh nghiệm làm việc này");
        currentWorkHistory.UpdatedDate = DateTimeOffset.Now;
        currentWorkHistory.Description = workHistory.Description;
        currentWorkHistory.From = workHistory.From;
        currentWorkHistory.To = workHistory.To;
        currentWorkHistory.CompanyName = workHistory.CompanyName;
        currentWorkHistory.IsWorking = workHistory.IsWorking;
        _unitOfWork.Repository<WorkHistory>().Update(currentWorkHistory);
        return await _unitOfWork.SaveChangeAsync();
    }
}
