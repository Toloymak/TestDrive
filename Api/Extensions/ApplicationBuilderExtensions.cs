namespace Api.Extensions
{
    using Hubs;

    using Microsoft.AspNetCore.Builder;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder ConfigureHubs(this IApplicationBuilder app)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<LinkHub>("/links");
                endpoints.MapHub<ContextHub>("/contexts");
            });
            return app;
        }

        public static IApplicationBuilder ConfigureSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TestDrive — Api V1");
                c.RoutePrefix = string.Empty;
            });
            return app;
        }

        public static IApplicationBuilder ConfigureCors(this IApplicationBuilder app)
        {
            app.UseCors(builder =>
            {
                // todo: Сделать тут нормально
                builder.WithOrigins(CorsOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
            
            return app;
        }

        private static readonly string[] CorsOrigins = new[]
        {
            "http://localhost:9000",
            "http://localhost:9010",
            "http://vm-lastmile",
            "https://vm-lastmile",
            "https://vm-lastmile.kontur",
            "http://vm-lastmile.kontur"
        };
    }
}