namespace EW.WebAPI.Models.Models.RecruitmentPosts
{
    public class AddRecruitmentPostModel
    {
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public int Salary { get; set; }
        public DateTimeOffset Deadline { get; set; }
        public long? CompanyId { get; set; }
    }
}
