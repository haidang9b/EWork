namespace EW.WebAPI.Models.ViewModels;

public class UserViewModel
{
    public long Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string CreatedDate { get; set; } = string.Empty;
    public string UpdatedDate { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
}
