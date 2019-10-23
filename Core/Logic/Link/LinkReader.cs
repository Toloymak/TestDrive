using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Entities.Base;

namespace Core.Logic.Link
{
    public class LinkReader: ReaderBase<DatabaseLayer.Entities.Link.Link>
    {
        public LinkReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}