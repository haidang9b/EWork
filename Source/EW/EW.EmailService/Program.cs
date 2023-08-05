using EW.Services.Email.Messaging;
using EW.Services.Email.Models;
using EW.Services.Email.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("MailSettings"));

builder.Services.Configure<RabbitMQConfiguration>(builder.Configuration.GetSection("RabbitMQConfiguration"));

builder.Services.AddSingleton<IEmailService, EmailService>();

builder.Services.AddHostedService<RabbitMQMarkedEmailConsumer>();
builder.Services.AddHostedService<RabbitMQAppliedNotifyConsumer>();

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

app.UseHttpsRedirection();
app.Run();