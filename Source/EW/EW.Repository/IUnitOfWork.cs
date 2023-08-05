using EW.Domain;

namespace EW.Repository;

public interface IUnitOfWork
{
    Task<bool> SaveChangeAsync();
    void BeginTransaction();
    void Commit();
    void RollBack();
    IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
}
