namespace Api
{
    using Api.Extensions;

    using AutoMapper;

    using Core.Logic.Links;
    using Core.Logic.Contexts;
    using Core.Mapping;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    using DataLayer;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IMapper>(MapperManager.Create())
                .AddScoped<DriveContext>()
                .AddScoped<ContextWriter>()
                .AddScoped<ContextReader>()
                .AddScoped<LinkReader>()
                .AddScoped<LinkWriter>();

            services.AddSignalR();

            services.AddCors()
                .AddCustomSwaggerGet()
                .AddMvc(option => option.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
            app.UseHttpsRedirection();
            app.UseMvcWithDefaultRoute();
            app.UseRouting();
            
            app.ConfigureSwagger();
            app.ConfigureHubs();
            app.ConfigureCors();
        }
    }
}