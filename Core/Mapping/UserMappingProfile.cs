namespace Core.Mapping
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, UserNameDto>();
            CreateMap<UserDto, User>();
        }
    }
}