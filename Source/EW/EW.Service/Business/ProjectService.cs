﻿using EW.Domain.Entities;
using EW.Repository;
using EW.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Project> Add(Project model)
        {
            model.CreatedDate = DateTimeOffset.Now;
            model.UpdatedDate = DateTimeOffset.Now;
            await _unitOfWork.Repository<Project>().AddAsync(model);
            if (await _unitOfWork.SaveChangeAsync() == false)
                throw new Exception("Không thể thêm dự án này");
            return model;
        }

        public async Task<bool> Delete(Project model)
        {
            var currentProject = await _unitOfWork.Repository<Project>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (currentProject == null)
            {
                throw new Exception("Không tồn tại dự án này");
            }
            _unitOfWork.Repository<Project>().Delete(currentProject);
            return await _unitOfWork.SaveChangeAsync();
        }

        public async Task<bool> Update(Project model)
        {
            var currentProject = await _unitOfWork.Repository<Project>().FirstOrDefaultAsync(item => item.Id == model.Id);
            if (currentProject == null)
            {
                throw new Exception("Không tồn tại dự án này");
            }
            currentProject.UpdatedDate = DateTimeOffset.Now;
            currentProject.Description = model.Description;
            currentProject.From = model.From;
            currentProject.To = model.To;
            currentProject.ProjectName = model.ProjectName;
            currentProject.CustomerName = model.CustomerName;
            _unitOfWork.Repository<Project>().Update(currentProject);
            return await _unitOfWork.SaveChangeAsync();
        }
    }
}