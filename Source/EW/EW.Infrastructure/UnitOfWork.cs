using EW.Domain;
using EW.Repository;

namespace EW.Infrastructure;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private bool _disposed;
    private readonly EWContext _dbContext;
    private readonly Dictionary<Type, object> repositories;
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
        if (!repositories.TryGetValue(type, out _))
        {
            repositories.Add(type, new EWRepository<TEntity>(_dbContext));
        }
        return (IRepository<TEntity>)repositories[type];
    }

    public void RollBack()
    {
        _dbContext.Database.RollbackTransaction();
    }

    public async Task<bool> SaveChangeAsync()
    {
        return await _dbContext.SaveChangesAsync() > 0;
    }
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed && disposing)
        {
            _dbContext.Dispose();
        }
        _disposed = true;
    }
}
