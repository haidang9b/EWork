using EW.Domain;
using EW.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EW.Infrastructure
{
    public class EWContext: DbContext
    {
        public EWContext(DbContextOptions<EWContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
