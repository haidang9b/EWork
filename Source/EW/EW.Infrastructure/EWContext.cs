using EW.Commons.Enums;
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
            modelBuilder.Entity<Role>().HasData(
                        new Role { Id = (long)ERole.ID_Faculty, Name = "Faculty", Description = "Faculty", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now },
                        new Role { Id = (long)ERole.ID_Business, Name = "Business", Description = "Business", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now },
                        new Role { Id = (long)ERole.ID_Student, Name = "Student", Description = "Student", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now }
                    );

        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Recruiter> Recruiters { get; set; }
        public DbSet<UserCV> UserCvs { get; set; }
        public DbSet<UserExperience> UserExperiences { get; set; }
    }
}
