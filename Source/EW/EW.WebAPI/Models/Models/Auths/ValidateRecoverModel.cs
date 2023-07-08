namespace EW.WebAPI.Models.Models.Auths
{
    public class ValidateRecoverModel
    {
        public string Code { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
    }

    public class SubmitRecoverModel : ValidateRecoverModel
    {
        public string Password { get; set; } = string.Empty;
    }
}
