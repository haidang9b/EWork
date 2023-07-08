using EW.Domain;

namespace EW.Repository
{
    public interface IDatabaseFactory<out T> where T : BaseEntity
    {
        IQueryable<T> ExecuteDBStored(string storedName, params object[] parameters);
    }
}
