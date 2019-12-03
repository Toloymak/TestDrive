namespace Core.Mapping.Profiles
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class UserContextProfile : Profile
    {
        public UserContextProfile()
        {
            CreateMap<UserContext, UserContextDto>();
            CreateMap<UserContextDto, UserContext>();
        }
    }
}