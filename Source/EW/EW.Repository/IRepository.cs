using EW.Domain;
using System.Linq.Expressions;

namespace EW.Repository
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        void Delete(TEntity entity);
        void DeleteRange(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        TEntity InsertOrUpdate(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entities);
        Task<TEntity> FindAsync(long id);
        Task AddAsync(TEntity entity);
        Task AddRangeAsync(IEnumerable<TEntity> entities);
        Task<IList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "");
        Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "");
        Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "");
    }
}
