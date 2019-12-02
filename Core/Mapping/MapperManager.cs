using AutoMapper;
using System.Collections.Generic;

namespace Core.Mapping
{
    public static class MapperManager
    {
        public static Mapper Create() =>
            new Mapper(new MapperConfiguration(c => c.AddProfiles(
                new List<Profile>
                {
                    new ContextMappingProfile()
                })));
    }
}