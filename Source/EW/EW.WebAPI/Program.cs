using EW.Infrastructure;
using EW.Repository;
using EW.Services.Business;
using EW.Services.Constracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultDatabase");
builder.Services.AddDbContext<EWContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
RegisterService(builder.Services);


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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();



void RegisterService(IServiceCollection services)
{
    services.AddScoped(typeof(IRepository<>), typeof(EWRepository<>));
    services.AddScoped(typeof(IDatabaseFactory<>), typeof(DatabaseFactory<>));
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IUnitOfWork, UnitOfWork>();
}