using EW.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EW.Repository
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        TEntity Find(long id);
        bool Add(TEntity entity);
        bool AddRange(IEnumerable<TEntity> entities);
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> predicate);
        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        bool Update(TEntity entity);
        TEntity InsertOrUpdate(TEntity entity);
        bool UpdateRange(IEnumerable<TEntity> entities);
        bool Delete(TEntity entity);
        bool DeleteRange(IEnumerable<TEntity> entities);
        bool Any(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FindAsync(long id);
        Task<bool> AddAsync(TEntity entity);
        Task<bool> AddRangeAsync(IEnumerable<TEntity> entities);
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<bool> UpdateAsync(TEntity entity);
        Task<bool> UpdateRangeAsync(IEnumerable<TEntity> entities);
    }
}
