﻿using EW.Domain.Entities;
using EW.Domain.Models;
using EW.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface IRecruiterService
    {
        Task<bool> AddNewRecruiter(RegisterRecruiterModel model);
        Task<Company> Find(Company recruiter);
        Task<Company> GetCompanyByUser(User user);
        Task<IEnumerable<Company>> GetCompanies();
        Task<IEnumerable<RecruiterViewModel>> GetRecruiters();
    }
}
