using EW.Commons.Enums;

namespace EW.WebAPI.Models.Models.Applications
{
    public class UpdateProgressModel
    {
        public long Id { get; set; }
        public EApplicationStatus Status { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
