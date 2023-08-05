namespace EW.WebAPI.Models.Models.Blogs;

public class AddBlogModel
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public long BlogCategoryId { get; set; }
}
