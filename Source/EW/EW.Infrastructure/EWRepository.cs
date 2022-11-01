using EW.Domain;
using EW.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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
        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public async Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public bool Any(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Where(predicate).Any();
        }

        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public TEntity Find(long id) => _dbSet.Find(id);

        public async Task<TEntity> FindAsync(long id) => await _dbSet.FindAsync(id);

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
        {
            var query = _dbSet.Where(predicate);
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return query.FirstOrDefault();
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
        {
            var query = _dbSet.Where(predicate);
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return await query.FirstOrDefaultAsync();
        }

        public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
        {
            var query = _dbSet.Where(predicate);
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public IQueryable<TEntity> GetAll(string includeProperties = "")
        {
            var query = _dbSet.AsQueryable();
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "")
        {
            var query = _dbSet.AsQueryable();
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return await query.ToListAsync();
        }

        public async Task<IList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
        {
            var query = _dbSet.Where(predicate);
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return await query.ToListAsync();
        }

        public TEntity InsertOrUpdate(TEntity entity)
        {
            var result = _dbSet.Attach(entity);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        public void Update(TEntity entity)
        {
            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }


        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            _dbContext.ChangeTracker.Clear();
            foreach (var en in entities)
            {
                _dbContext.Entry(en).State = EntityState.Modified;
            }
            _dbSet.UpdateRange(entities);
        }
    }
}
