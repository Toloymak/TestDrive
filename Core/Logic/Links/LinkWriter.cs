using AutoMapper;

using DataLayer.Entities;

namespace Core.Logic.Links
{
    using Core.Logic.Base;

    using DataLayer;

    using Dtos;

    public class LinkWriter: WriterBase<Link, LinkDto>
    {
        public LinkWriter(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}