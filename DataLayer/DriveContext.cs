namespace DataLayer
{
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class DriveContext: DbContext
    {
        public DriveContext()
        {
            // this.Database.EnsureCreated();
        }
        
        public DbSet<Link> Links { get; set; }

        public DbSet<Context> Contexts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=TestDrive.db");
        }
    }
}