using EW.Domain;
using EW.Repository;
using Microsoft.EntityFrameworkCore;

namespace EW.Infrastructure
{
    public class DatabaseFactory<T> : IDatabaseFactory<T> where T : BaseEntity
    {
        protected readonly EWContext _dbContext;
        private DbSet<T> DbSet => _dbContext.Set<T>();
        public DatabaseFactory(EWContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<T> ExecuteDBStored(string storedName, params object[] parameters) => DbSet.FromSqlRaw(storedName, parameters);
    }
}
