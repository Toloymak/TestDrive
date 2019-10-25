using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Entities.Base;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Logic.Links
{
    public class LinkReader: ReaderBase<Link, LinkDto>
    {
        public LinkReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public IList<FrontLinkModel> GetAllFrontLinkModels()
        {
            var links = All.Include(l => l.Block);
            var frontLinkModels = Mapper.Map<IList<FrontLinkModel>>(links);
            return frontLinkModels;
        }

        public LinkDto GetByLink(string url)
        {
            var link = All
                .FirstOrDefault(l => string.Equals(l.Url, url, StringComparison.OrdinalIgnoreCase));

            return Mapper.Map<LinkDto>(link);
        }
    }
}