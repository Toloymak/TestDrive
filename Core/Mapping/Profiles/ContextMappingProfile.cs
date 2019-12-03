namespace Core.Mapping.Profiles
{
    using AutoMapper;

    using DataLayer.Entities;

    using Dtos;

    public class ContextMappingProfile : Profile
    {
        public ContextMappingProfile()
        {
            CreateMap<Context, ContextDto>();
            CreateMap<ContextDto, Context>();
            CreateMap<Context, ContextWithLinksDto>();
            CreateMap<Link, LinkDto>();
            CreateMap<LinkDto, Link>();
        }
    }
}