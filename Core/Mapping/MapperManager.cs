using System.Collections.Generic;
using AutoMapper;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;
using DataLayer.Entities;

namespace Core.Mapping
{
    public static class MapperManager
    {
        public static Mapper Create() =>
            new Mapper(new MapperConfiguration(c => c.AddProfiles(
                new List<Profile>
                {
                    new LinkMappingProfile(),
                    new BlockMappingProfile()
                })));
    }
}