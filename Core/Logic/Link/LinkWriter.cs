using AutoMapper;
using DatabaseLayer;
using DatabaseLayer.Entities.Base;

namespace Core.Logic.Link
{
    public class LinkWriter: WriterBase<DatabaseLayer.Entities.Link.Link>
    {
        public LinkWriter(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }
    }
}