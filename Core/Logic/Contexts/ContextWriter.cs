namespace Core.Logic.Contexts
{
    using AutoMapper;

    using Core.Dtos;
    using Core.Logic.Base;

    using DataLayer;
    using DataLayer.Entities;

    public class ContextWriter: WriterBase<Context, ContextDto>
    {
        public ContextWriter(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
    }
}