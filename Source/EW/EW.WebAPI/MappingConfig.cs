using AutoMapper;
using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.WebAPI.Models.Models.Auths;

namespace EW.WebAPI
{
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
            });
            return mappingConfig;
        }
    }
}
