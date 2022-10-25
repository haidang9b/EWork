using EW.Domain.Entities;

namespace EW.WebAPI.Models.ViewModels
{
    public class LoginViewModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public User User { get; set; } 
    }
}
