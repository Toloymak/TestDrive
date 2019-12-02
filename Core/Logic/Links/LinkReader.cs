using System;
using System.Linq;
using AutoMapper;
using DataLayer.Entities;

namespace Core.Logic.Links
{
    using Core.Logic.Base;

    using DataLayer;

    using Dtos;

    public class LinkReader: ReaderBase<Link, LinkDto>
    {
        public LinkReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public LinkDto GetByLink(string url)
        {
            var link = All
                .FirstOrDefault(l => string.Equals(l.Url, url, StringComparison.OrdinalIgnoreCase));

            return Mapper.Map<LinkDto>(link);
        }
    }
}