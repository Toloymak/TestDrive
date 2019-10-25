using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Entities.Base;
using DataLayer.Entities;

namespace Core.Logic.Links
{
    public class LinkReader: ReaderBase<Link, LinkDto>
    {
        public LinkReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
        

    }
}