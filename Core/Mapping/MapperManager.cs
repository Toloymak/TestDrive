namespace Core.Mapping
{
    using System.Collections.Generic;

    using AutoMapper;

    public static class MapperManager
    {
        public static Mapper Create() =>
            new Mapper(new MapperConfiguration(c => c.AddProfiles(
                new List<Profile>
                {
                    new ContextMappingProfile(),
                    new ContextOrderProfile(),
                    new HiddenContextProfile(),
                    new UserMappingProfile()
                })
            ));
    }
}