namespace Core.Mapping
{
    using AutoMapper;

    using Core.Dtos;

    using DataLayer.Entities;

    public class LinkMappingProfile : Profile
    {
        public LinkMappingProfile()
        {
            CreateMap<Link, LinkDto>();
            CreateMap<LinkDto, Link>();
        }
    }
}
