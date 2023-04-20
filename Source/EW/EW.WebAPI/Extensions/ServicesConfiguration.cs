using AutoMapper;
using EW.Infrastructure;
using EW.Repository;
using EW.Services.Business;
using EW.Services.Constracts;
using EW.Services.Contracts;

namespace EW.WebAPI.Extensions
{
    public static class ServicesConfiguration
    {
        public static void RegisterService(this IServiceCollection services)
        {
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            services.AddSingleton(mapper);
            services.AddScoped(typeof(IRepository<>), typeof(EWRepository<>));
            services.AddScoped(typeof(IDatabaseFactory<>), typeof(DatabaseFactory<>));
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IRecruiterService, RecruiterService>();
            services.AddScoped<IUserCVService, UserCVService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IRecruitmentPostService, RecruitmentPostService>();
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IApplicationService, ApplicationService>();
            services.AddScoped<IProfileSerivce, ProfileService>();
            services.AddScoped<IWorkHistoryService, WorkHistoryService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ICertificateService, CertificateService>();
            services.AddScoped<IEducationService, EducationService>();
            services.AddScoped<IChartService, ChartService>();
            services.AddScoped<IBlogCategoryService, BlogCategoryService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
