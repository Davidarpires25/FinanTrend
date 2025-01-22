using FinanceProject.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinanceProject.Server.Data
{
    public class ApplicationDBContext:IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions):base(dbContextOptions){
            
        }

        public DbSet<Stock> Stocks { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;

        public DbSet<Portfolio> Portfolios { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>().HasKey(x => new { x.UserId, x.StockId });
            builder.Entity<Portfolio>()
                .HasOne(x=> x.AppUser)
                .WithMany(x => x.Portfolios)
                .HasForeignKey(x => x.UserId);

            builder.Entity<Portfolio>()
                .HasOne(x => x.Stock)
                .WithMany(x => x.Portfolios)
                .HasForeignKey(x => x.StockId);

            List<IdentityRole> roles = new List<IdentityRole>{
                new IdentityRole { Id = "Admin", Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Id = "User", Name = "User", NormalizedName = "USER" }

            };

            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}
