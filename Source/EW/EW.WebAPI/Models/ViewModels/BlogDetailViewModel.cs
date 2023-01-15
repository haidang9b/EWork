using EW.Domain.Entities;

namespace EW.WebAPI.Models.ViewModels
{
    public class BlogDetailViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public long CreatedBy { get; set; }
        public long BlogCategoryId { get; set; }
        public string BlogCategoryName { get; set; } = string.Empty;
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set;}
        public string Author { get; set; } = string.Empty;
    }
}
