using EW.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Repository
{
    public interface IDatabaseFactory<T> where T : BaseEntity
    {
        IQueryable<T> ExecuteDBStored(string storedName, params object[] parameters);
    }
}
