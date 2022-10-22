using EW.Domain;
using EW.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Infrastructure
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private bool _disposed;
        private EWContext _dbContext;
        private Dictionary<Type, object> repositories;
        public UnitOfWork(EWContext dbContext)
        {
            _dbContext = dbContext;
            repositories = new Dictionary<Type, object>();
        }
        public void BeginTransaction()
        {
            _dbContext.Database.BeginTransaction();
        }

        public void Commit()
        {
            _dbContext.Database.CommitTransaction();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            var type = typeof(TEntity);
            if (!repositories.ContainsKey(type))
            {
                repositories.Add(type, new EWRepository<TEntity>(_dbContext));
            }
            return (IRepository<TEntity>)repositories[type];
        }

        public void RollBack()
        {
            _dbContext.Database.RollbackTransaction();
        }

        public bool SaveChange()
        {
            return _dbContext.SaveChanges() > 0;
        }

        public async Task<bool> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
