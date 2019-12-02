using AutoMapper;

namespace Core.Mapping
{
    using Core.Logic.Dtos;

    using DataLayer.Entities;

    public class BlockMappingProfile : Profile {
        public BlockMappingProfile() {
            CreateMap<Context, BlockDto>();
            CreateMap<BlockDto, Context>();
            CreateMap<Context, BlockWithLinkDto>();
        }
    }
}