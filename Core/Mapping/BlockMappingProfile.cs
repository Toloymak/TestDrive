using System.Collections.Generic;
using AutoMapper;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;
using DataLayer.Entities;

namespace Core.Mapping
{
    public class BlockMappingProfile : Profile {
        public BlockMappingProfile() {
            CreateMap<Block, BlockDto>();
            CreateMap<BlockDto, Block>();
            CreateMap<Block, BlockWithLinkDto>();
        }
    }
}