using AutoMapper;
using DatabaseLayer.Entities.Blocks;
using DatabaseLayer.Entities.Link;

namespace Core.Mapping
{
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Block, BlockDto>();
            CreateMap<BlockDto, Block>();
            
            CreateMap<Link, LinkDto>();
            CreateMap<LinkDto, Link>();
        }
    }
}