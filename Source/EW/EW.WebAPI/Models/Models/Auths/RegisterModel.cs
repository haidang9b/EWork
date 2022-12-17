namespace EW.WebAPI.Models.Models.Auths
{
    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NumberPhone { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }

    public class UpdateAccount : RegisterModel
    {
    }
}
