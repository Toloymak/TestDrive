using AutoMapper;

namespace Core.Mapping
{
    using Core.Dtos;

    using DataLayer.Entities;

    public class ContextMappingProfile : Profile {
        public ContextMappingProfile() {
            CreateMap<Context, ContextDto>();
            CreateMap<ContextDto, Context>();
            CreateMap<Context, ContextWithLinksDto>();
        }
    }
}