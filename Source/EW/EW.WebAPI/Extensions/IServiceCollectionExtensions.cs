using AutoMapper;
using EW.Commons.Constaints;
using EW.Domain.Models;
using EW.Infrastructure;
using EW.MessageSender;
using EW.Repository;
using EW.Services.Business;
using EW.Services.Constracts;
using EW.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EW.WebAPI.Extensions;

public static class IServiceCollectionExtensions
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

        services.AddSingleton<IRabbitMQMessageSender, RabbitMQMessageSender>();

    }

    public static void AddCustomsConfigureObject(
        this IServiceCollection services,
        ConfigurationManager configurationManager
    )
    {
        services.Configure<CustomConfig>(configurationManager.GetSection("CustomConfigs"));
    }

    public static void AddEWDbConfiguration(
        this IServiceCollection services,
        ConfigurationManager configurationManager
    )
    {
        var connectionString = configurationManager.GetConnectionString("DefaultDatabase");
        services.AddDbContext<EWContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
    }

    public static void AddServices(this IServiceCollection services,
        ConfigurationManager configurationManager)
    {
        string MyAllowSpecificOrigins = configurationManager.GetValue<string>("MyAllowSpecificOrigins")
            ?? throw new ArgumentNullException(paramName: nameof(MyAllowSpecificOrigins));

        // Add services to the container.

        services.AddControllers();
        services.AddRabbitMQSender(configurationManager);
        services.AddEWDbConfiguration(configurationManager);
        services.AddCors(options =>
        {
            options.AddPolicy(MyAllowSpecificOrigins,
                builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        });
        services.AddCors();

        services.RegisterService();
        services.AddCustomsConfigureObject(configurationManager);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options =>
                        {
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constaints.ACCES_TOKEN_KEY)),
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ValidateLifetime = true,
                                ClockSkew = TimeSpan.Zero

                            };
                        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}
