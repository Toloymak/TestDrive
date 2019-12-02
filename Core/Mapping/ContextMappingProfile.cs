namespace Core.Mapping
{
    using AutoMapper;

    using Core.Dtos;

    using DataLayer.Entities;

    public class ContextMappingProfile : Profile
    {
        public ContextMappingProfile()
        {
            CreateMap<Context, ContextDto>();
            CreateMap<ContextDto, Context>();
            CreateMap<Context, ContextWithLinksDto>();
        }
    }
}