﻿using AutoMapper;
using EW.Commons.Enums;
using EW.Domain.Entities;
using EW.WebAPI.Models.Models.Auths;
using EW.WebAPI.Models.ViewModels;

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

                config.CreateMap<Blog, BlogDetailViewModel>()
                .ForMember(dest => dest.Author, option => option.MapFrom(source => source.User.FullName))
                .ForMember(dest => dest.BlogCategoryName, option => option.MapFrom(source => source.BlogCategory.Name))
                .ForMember(dest => dest.CreatedBy, option => option.MapFrom(source => source.UserId));
            });
            return mappingConfig;
        }
    }
}
