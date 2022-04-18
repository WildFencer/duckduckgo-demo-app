using System.Text.Json.Serialization;
using DuckDuck.Dal;
using DuckDuck.Dal.Abstracts;
using DuckDuck.Services;
using DuckDuck.Services.Abstracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace DuckDuckApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));

            services.AddControllers();

            services.AddCors(c =>
            {
                c.AddDefaultPolicy(x => x
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                );
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DuckDuck Api", Version = "v1" });
            });

            services.AddMvc()
                .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    });

            services.AddLogging();

            services.AddApiVersioning(options =>
            {
                options.DefaultApiVersion = new ApiVersion(1, 0);
            });

            AddAppServices(services);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../ng-client/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "DuckDuck Api v1");
                c.DocumentTitle = "DuckDuck API";
                c.RoutePrefix = "docs";
                c.EnableFilter();
                c.DefaultModelRendering(Swashbuckle.AspNetCore.SwaggerUI.ModelRendering.Example);
            });

            app.UseCors();

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "../ng-client";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                // spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }

        /// <summary>
        /// Register the application services for DI
        /// </summary>
        /// <param name="services"></param>
        private void AddAppServices(IServiceCollection services)
        {
            // Register services
            services.AddScoped<IDuckDuckGoService, DuckDuckGoService>();
            services.AddScoped<IFileService, FileService>();
        }
    }
}
