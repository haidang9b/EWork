using EW.WebAPI.Middlewares;
using Microsoft.Extensions.FileProviders;

namespace EW.WebAPI.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication UseCommons(this WebApplication app, ConfigurationManager configurationManager)
    {
        string MyAllowSpecificOrigins = configurationManager.GetValue<string>("MyAllowSpecificOrigins")
           ?? throw new ArgumentNullException(paramName: nameof(MyAllowSpecificOrigins));

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseEWExceptionHandler();
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "Uploads")),
            RequestPath = "/Uploads"
        });
        app.UseRouting();
        app.UseCors(MyAllowSpecificOrigins);
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}
