using EW.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Repository
{
    public interface IUnitOfWork
    {
        bool SaveChange();
        Task<bool> SaveChangeAsync();
        void BeginTransaction();
        void Commit();
        void RollBack();
        IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    }
}
