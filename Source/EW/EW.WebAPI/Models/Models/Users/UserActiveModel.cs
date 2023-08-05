namespace EW.WebAPI.Models.Models.Users;

public class UserActiveModel
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}
