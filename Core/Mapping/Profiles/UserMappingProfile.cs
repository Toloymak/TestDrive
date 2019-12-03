namespace Core.Mapping.Profiles
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}