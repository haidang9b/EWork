namespace EW.WebAPI.Models.Models.Auths;

public class LoginWithGoogleModel
{
    public string Email { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string GoogleId { get; set; } = string.Empty;
}
