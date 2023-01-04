namespace EW.WebAPI.Models.Models.Profiles
{
    public class AddWorkHistory
    {
        public string CompanyName { get; set; } = String.Empty;
        public bool IsWorking { get; set; }
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
        public string Description { get; set; } = String.Empty;
    }
}
