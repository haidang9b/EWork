using EW.Commons.Extensions;
using EW.Domain;
using EW.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;

namespace EW.Infrastructure
{
    public class EWContext: DbContext
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
