using EW.Commons.Constaints;
using EW.Domain.Models;
using EW.Infrastructure;
using EW.Repository;
using EW.Services.Business;
using EW.Services.Constracts;
using EW.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultDatabase");
builder.Services.AddDbContext<EWContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

RegisterService(builder.Services);
builder.Services.Configure<EmailConfig>(builder.Configuration.GetSection("MailSettings"));
builder.Services.Configure<CustomConfig>(builder.Configuration.GetSection("CustomConfigs"));
builder.Services.AddCors();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment() == false)
{
    app.UseHsts();
}


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<EWContext>();
    context.Database.Migrate();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/Uploads"
});
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

void RegisterService(IServiceCollection services)
{
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