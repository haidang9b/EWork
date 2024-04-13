using EW.WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddServices(builder.Configuration);

var app = builder.Build();

app.UseCommons(builder.Configuration);

app.Run();
