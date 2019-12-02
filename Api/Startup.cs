using Api.Extensions;
using Api.Hubs;
using AutoMapper;
using Core.Logic.Links;
using Core.Managers;
using Core.Mapping;
using DatabaseLayer;
using DatabaseLayer.Entities.Blocks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
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
                .AddScoped<BlockWriter>()
                .AddScoped<BlockReader>()
                .AddScoped<LinkReader>()
                .AddScoped<LinkWriter>()
                .AddScoped<FrontManager>();
            
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