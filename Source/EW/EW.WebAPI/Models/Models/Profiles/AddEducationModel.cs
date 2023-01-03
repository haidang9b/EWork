namespace EW.WebAPI.Models.Models.Profiles
{
    public class AddEducationModel
    {
        public string OrgName { get; set; } = String.Empty;
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
        public string Description { get; set; } = String.Empty;
    }
}
