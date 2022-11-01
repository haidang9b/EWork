using EW.Commons.Extensions;
using EW.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EW.Infrastructure
{
    public class EWContext : DbContext
    {
        public EWContext(DbContextOptions<EWContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ModelBuilderExtensions.SeedRoles(modelBuilder);
        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
