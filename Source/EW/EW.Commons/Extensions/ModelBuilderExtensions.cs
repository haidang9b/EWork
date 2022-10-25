using EW.Commons.Enums;
using EW.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Commons.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedRoles(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                   new Role { Id = (long)ERole.ID_Faculty, Name = "Faculty", Description = "Faculty", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now},
                   new Role { Id = (long)ERole.ID_Business, Name = "Business", Description = "Business", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now},
                   new Role { Id = (long)ERole.ID_Student, Name = "Student", Description = "Student", CreatedDate = DateTimeOffset.Now, UpdatedDate = DateTimeOffset.Now}
                );
        }
    }
}
