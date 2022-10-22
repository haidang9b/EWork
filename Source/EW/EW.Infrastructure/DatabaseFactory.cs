using EW.Domain;
using EW.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Infrastructure
{
    public class DatabaseFactory<T> : IDatabaseFactory<T> where T : BaseEntity
    {
        protected readonly EWContext _dbContext;
        private DbSet<T> _dbSet => _dbContext.Set<T>();
        public DatabaseFactory(EWContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<T> ExecuteDBStored(string storedName, params object[] parameters) => _dbSet.FromSqlRaw(storedName, parameters);
    }
}
