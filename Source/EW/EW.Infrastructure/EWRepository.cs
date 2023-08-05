using EW.Domain;
using EW.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EW.Infrastructure;

public class EWRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
    private readonly EWContext _dbContext;
    private DbSet<TEntity> DbSet => _dbContext.Set<TEntity>();

    public EWRepository(EWContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(TEntity entity)
    {
        await DbSet.AddAsync(entity);
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
        await DbSet.AddRangeAsync(entities);
    }

    public void Delete(TEntity entity)
    {
        DbSet.Remove(entity);
    }

    public void DeleteRange(IEnumerable<TEntity> entities)
    {
        DbSet.RemoveRange(entities);
    }

    public async Task<TEntity> FindAsync(long id) => await DbSet.FindAsync(id);

    public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
    {
        var query = DbSet.Where(predicate);
        foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty);
        }
        return await query.FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "")
    {
        var query = DbSet.AsQueryable();
        foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty);
        }
        return await query.ToListAsync();
    }

    public async Task<IList<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
    {
        var query = DbSet.Where(predicate);
        foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty);
        }
        return await query.ToListAsync();
    }

    public TEntity InsertOrUpdate(TEntity entity)
    {
        var result = DbSet.Attach(entity);
        _dbContext.SaveChanges();
        return result.Entity;
    }

    public void Update(TEntity entity)
    {
        DbSet.Attach(entity);
        _dbContext.Entry(entity).State = EntityState.Modified;
    }


    public void UpdateRange(IEnumerable<TEntity> entities)
    {
        _dbContext.ChangeTracker.Clear();
        foreach (var en in entities)
        {
            _dbContext.Entry(en).State = EntityState.Modified;
        }
        DbSet.UpdateRange(entities);
    }
}
