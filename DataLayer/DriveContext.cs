namespace DataLayer
{
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public class DriveContext: DbContext
    {
        public DriveContext()
        {
            this.Database.EnsureCreated();
        }
        
        public DbSet<Link> Links { get; set; }

        public DbSet<Context> Contexts { get; set; }
        
        public DbSet<User> Users { get; set; }
        
        public DbSet<UserContext> UserContexts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlite("Data Source=TestDrive.db")
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
    }
}