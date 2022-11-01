namespace EW.Domain
{
    public class BaseEntity
    {
        public long Id { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
    }

    public abstract class EWEntity : BaseEntity
    {

    }
}
