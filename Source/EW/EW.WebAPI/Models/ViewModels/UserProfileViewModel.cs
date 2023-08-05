using EW.Domain.Entities;

namespace EW.WebAPI.Models.ViewModels;

public class UserProfileViewModel
{
    public string CoverLetter { get; set; } = string.Empty;
    public IEnumerable<UserExperience>? Experiences { get; set; }
    public IEnumerable<UserCV>? CVs { get; set; }
}
