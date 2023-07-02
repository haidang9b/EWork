using EW.Domain.Entities;

namespace EW.Domain.ViewModels
{
    public class RecruiterViewModel
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public string Position { get; set; }
        public Company Company { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
    }
}
