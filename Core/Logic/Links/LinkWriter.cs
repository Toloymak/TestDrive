using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Entities.Base;
using DataLayer.Entities;

namespace Core.Logic.Links
{
    public class LinkWriter: WriterBase<Link, LinkDto>
    {
        public LinkWriter(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}