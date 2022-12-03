namespace EW.WebAPI.Models.Models.Auths
{
    public class ValidateRecoverModel
    {
        public string Code { get; set; }
        public string Username { get; set; }
    }

    public class SubmitRecoverModel: ValidateRecoverModel
    {
        public string Password { get; set; }
    }
}
