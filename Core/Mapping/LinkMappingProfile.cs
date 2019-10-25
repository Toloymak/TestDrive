using System.Collections.Generic;
using AutoMapper;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;
using DataLayer.Entities;

namespace Core.Mapping
{
    public class LinkMappingProfile : Profile {
        public LinkMappingProfile() {
            CreateMap<Link, LinkDto>();
            CreateMap<LinkDto, Link>();
        }
    }
}