namespace EW.WebAPI.Models.Models.Profiles
{
    public class AddProjectModel
    {
        public string ProjectName { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
        public string Description { get; set; } = String.Empty;
    }
}
