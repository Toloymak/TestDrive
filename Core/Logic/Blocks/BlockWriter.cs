using System;
using AutoMapper;
using DatabaseLayer.Entities.Base;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockWriter: WriterBase<Block>
    {
        public BlockWriter(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
    }
}