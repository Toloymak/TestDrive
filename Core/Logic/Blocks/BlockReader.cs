using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DatabaseLayer.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace DatabaseLayer.Entities.Blocks
{
    public class BlockReader: ReaderBase<Block, BlockDto>
    {
        public BlockReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public IList<BlockWithLinkDto> GetAllBlocksWithLink()
        {
            var blocks = Mapper.Map<IList<BlockWithLinkDto>>(
                All
                    .Include(b => b.Links));
            
            return blocks;
        }
        
        public BlockWithLinkDto GetBlocksWithLink(Guid id)
        {
            var block = Mapper.Map<BlockWithLinkDto>(
                All
                    .Include(b => b.Links)
                    .First(b => b.Id == id));
            
            return block;
        }
    }
}