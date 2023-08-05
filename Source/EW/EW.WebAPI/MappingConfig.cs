using AutoMapper;
using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.Models.Companies;
using EW.WebAPI.Models.Models.Profiles;
using EW.WebAPI.Models.Models.RecruitmentPosts;
using EW.WebAPI.Models.ViewModels;

namespace EW.WebAPI;

public class MappingConfig
{
    public static MapperConfiguration RegisterMaps()
    {
        var mappingConfig = new MapperConfiguration(config =>
        {
            config.CreateMap<RegisterModel, User>()
            .ForMember(dest => dest.PhoneNumber, option => option.MapFrom(source => source.NumberPhone))
            .ForMember(dest => dest.RoleId, option => option.MapFrom(source => (long)ERole.ID_Business));

            config.CreateMap<LoginWithGoogleModel, User>()
            .ForMember(dest => dest.Username, option => option.MapFrom(source => source.GoogleId))
            .ForMember(dest => dest.RoleId, option => option.MapFrom(source => (long)ERole.ID_Student));

            config.CreateMap<Blog, BlogDetailViewModel>()
            .ForMember(dest => dest.Author, option => option.MapFrom(source => source.User.FullName))
            .ForMember(dest => dest.BlogCategoryName, option => option.MapFrom(source => source.BlogCategory.Name))
            .ForMember(dest => dest.CreatedBy, option => option.MapFrom(source => source.UserId));

            config.CreateMap<AddCompanyModel, Company>();
            config.CreateMap<AddProjectModel, Project>();
            config.CreateMap<RecruitmentPostModel, RecruitmentPost>();
            config.CreateMap<RecruitmentPost, RecruitmentPostShortViewModel>()
            .ForMember(dest => dest.AvatarUrl, option => option.MapFrom(source => source.Company.AvatarUrl))
            .ForMember(dest => dest.CompanyName, option => option.MapFrom(source => source.Company.CompanyName))
            .ForMember(dest => dest.CompanyType, option => option.MapFrom(source => source.Company.CompanyType));

            config.CreateMap<User, UserInfoViewModel>()
            .ForMember(dest => dest.Role, option => option.MapFrom(source => source.Role.Name));
        });
        return mappingConfig;
    }
}
