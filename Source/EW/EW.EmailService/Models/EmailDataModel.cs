namespace EW.Services.Email.Models
{
    public class EmailDataModel
    {
        public required string Subject { get; set; }
        public required string Body { get; set; }
        public required string ToEmail { get; set; }
    }
}
