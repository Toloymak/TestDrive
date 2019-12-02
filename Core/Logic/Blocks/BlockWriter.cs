namespace Core.Logic.Blocks
{
    using AutoMapper;

    using Core.Logic.Base;
    using Core.Logic.Dtos;

    using DataLayer;
    using DataLayer.Entities;

    public class BlockWriter: WriterBase<Context, BlockDto>
    {
        public BlockWriter(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
    }
}