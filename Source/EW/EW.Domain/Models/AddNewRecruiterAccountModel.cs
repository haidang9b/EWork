namespace EW.Domain.Models
{
    public class AddNewRecruiterAccountModel
    {
        public string FullName { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public long CompanyId { get; set; }
    }
}
