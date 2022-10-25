using EW.Domain;
using EW.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EW.Infrastructure
{
    public class EWRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly EWContext _dbContext;
        private DbSet<TEntity> _dbSet => _dbContext.Set<TEntity>();

        public EWRepository(EWContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool Add(TEntity entity)
        {
            _dbSet.Add(entity);
            return _dbContext.SaveChanges() > 0;
        }

        public async Task<bool> AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public bool AddRange(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
            return _dbContext.SaveChanges() > 0;
        }

        public async Task<bool> AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public bool Any(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Any(predicate);
        }

        public bool Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
            return _dbContext.SaveChanges() > 0;
        }

        public bool DeleteRange(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
            return _dbContext.SaveChanges() > 0;
        }

        public TEntity Find(long id) => _dbSet.Find(id);

        public async Task<TEntity> FindAsync(long id) => await _dbSet.FindAsync(id);

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate) => _dbSet.FirstOrDefault(predicate);

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate) => await _dbSet.FirstOrDefaultAsync(predicate);

        public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> predicate) => _dbSet.Where(predicate);

        public IQueryable<TEntity> GetAll() => _dbSet.AsNoTracking().AsQueryable();

        public async Task<IEnumerable<TEntity>> GetAllAsync() => await _dbSet.ToListAsync();

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate) => await _dbSet.Where(predicate).ToListAsync();

        public TEntity InsertOrUpdate(TEntity entity)
        {
            var result = _dbSet.Attach(entity);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public bool Update(TEntity entity)
        {
            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            return _dbContext.SaveChanges() > 0;
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public bool UpdateRange(IEnumerable<TEntity> entities)
        {
            _dbSet.UpdateRange(entities);
            return _dbContext.SaveChanges() > 0;
        }

        public async Task<bool> UpdateRangeAsync(IEnumerable<TEntity> entities)
        {
            _dbSet.UpdateRange(entities);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
