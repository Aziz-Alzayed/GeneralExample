using GeneralExampleSvc.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace GeneralExampleSvc.Data
{
    public class DbContextExample : IdentityDbContext<User>
    {
        public DbContextExample(DbContextOptions<DbContextExample> options)
            : base(options)
        {
        }

        public DbSet<Score> Scores { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<User>()
                .HasMany(u => u.Scores)
                .WithOne(s => s.User)
                .HasForeignKey(u => u.UserId);

            base.OnModelCreating(builder);
        }
    }
}
