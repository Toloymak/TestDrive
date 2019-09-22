using DatabaseLayer.Entities.Blocks;
using DatabaseLayer.Entities.Link;
using Microsoft.EntityFrameworkCore;

namespace DatabaseLayer
{
    public class DriveContext: DbContext
    {
        public DriveContext()
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Link> Links { get; set; }
        public DbSet<Block> Blocks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=TestDrive.db");
        }
    }
}