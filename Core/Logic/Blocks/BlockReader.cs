namespace Core.Logic.Blocks
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Core.Logic.Base;
    using Core.Logic.Dtos;

    using DataLayer;
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class BlockReader: ReaderBase<Context, BlockDto>
    {
        public BlockReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public IList<BlockWithLinkDto> GetAllBlocksWithLink()
        {
            var blocks = this.Mapper.Map<IList<BlockWithLinkDto>>(
                this.All
                    .Include(b => b.Links));
            
            return blocks;
        }
        
        public BlockWithLinkDto GetBlocksWithLink(Guid id)
        {
            var block = this.Mapper.Map<BlockWithLinkDto>(
                this.All
                    .Include(b => b.Links)
                    .First(b => b.Id == id));
            
            return block;
        }

        public BlockDto GetByName(string name) => this.Mapper.Map<BlockDto>(
            this.All
                .FirstOrDefault(b => string.Equals(
                    b.Name,
                    name,
                    StringComparison.OrdinalIgnoreCase)));
    }
}