using System;
using System.Collections.Generic;
using AutoMapper;
using DatabaseLayer.Entities.Base;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockReader: ReaderBase<Block>
    {
        public BlockReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public IList<BlockDto> GetAll => this.GetAllDto<BlockDto>();
        public BlockDto Get(Guid id) => this.GetDto<BlockDto>(id);
    }
}