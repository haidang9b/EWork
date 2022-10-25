namespace EW.WebAPI.Models.ViewModels
{
    public class UserViewModel
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public string PhoneNumber { get; set; }
    }
}
