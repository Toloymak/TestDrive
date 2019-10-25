using AutoMapper;
using Core.Logic.Links;
using DataLayer.Entities;

namespace Core.Mapping
{
    public class LinkMappingProfile : Profile {
        public LinkMappingProfile() {
            CreateMap<Link, LinkDto>();
            CreateMap<LinkDto, Link>();

            CreateMap<Link, FrontLinkModel>()
                .ForMember(lfm => lfm.Service, x => x.MapFrom(src => src.Block.Name))
                .ForMember(lfm => lfm.Description, x => x.MapFrom(src => src.Title));
        }
    }
}