namespace EW.Domain.Entities;

public class Blog : BaseEntity
{
    public string Title { get; set; }
    public string Content { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    public long BlogCategoryId { get; set; }
    public BlogCategory BlogCategory { get; set; }
}
