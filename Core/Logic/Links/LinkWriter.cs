using AutoMapper;

using DataLayer.Entities;

namespace Core.Logic.Links
{
    using Core.Logic.Base;
    using Core.Logic.Dtos;

    using DataLayer;

    public class LinkWriter: WriterBase<Link, LinkDto>
    {
        public LinkWriter(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}