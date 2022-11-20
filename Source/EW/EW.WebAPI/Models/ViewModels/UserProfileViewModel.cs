using EW.Domain.Entities;

namespace EW.WebAPI.Models.ViewModels
{
    public class UserProfileViewModel
    {
        public string CoverLetter { get; set; }
        public List<UserExperence> Experences { get; set; }
        public List<UserCV> CVs { get; set; }
    }
}
