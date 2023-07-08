using EW.Commons.Exceptions;
using EW.WebAPI.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;

namespace EW.WebAPI.ExceptionHandlers
{
    public static class EWExceptionHandler
    {
        public static void UseEWExceptionHandler(this WebApplication app)
        {
            app.UseExceptionHandler(exceptionHandlerApp =>
            {
                exceptionHandlerApp.Run(async context =>
                {
                    var exceptionHandlerPathFeature =
                        context.Features.Get<IExceptionHandlerPathFeature>();

                    if (exceptionHandlerPathFeature?.Error is EWException model)
                    {
                        context.Response.StatusCode = StatusCodes.Status200OK;

                        context.Response.ContentType = "application/json";

                        var response = new ApiResult
                        {
                            IsSuccess = false,
                            Message = model.Message,

                        };

                        var data = JsonSerializer.Serialize(response);

                        await context.Response.WriteAsync(data);
                    }
                });
            });
        }
    }
}
