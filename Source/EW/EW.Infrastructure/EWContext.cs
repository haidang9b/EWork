using EW.Commons.Enums;
using EW.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EW.Infrastructure;

public class EWContext : DbContext
{
    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<UserCV> UserCvs { get; set; }

    public virtual DbSet<UserExperience> UserExperiences { get; set; }

    public virtual DbSet<Recruiter> Recruiters { get; set; }

    public virtual DbSet<RecruitmentPost> RecruitmentPosts { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<Education> Educations { get; set; }

    public virtual DbSet<WorkHistory> WorkHistory { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Profile> Profiles { get; set; }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<BlogCategory> BlogCategories { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

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

}
