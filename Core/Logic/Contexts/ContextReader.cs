namespace Core.Logic.Contexts
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Core.Dtos;
    using Core.Logic.Base;
    using Core.Logic.Dtos;

    using DataLayer;
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class ContextReader: ReaderBase<Context, ContextDto>
    {
        public ContextReader(DriveContext driveContext, IMapper mapper) 
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

        public ContextDto GetByName(string name) => this.Mapper.Map<ContextDto>(
            this.All
                .FirstOrDefault(b => string.Equals(
                    b.Name,
                    name,
                    StringComparison.OrdinalIgnoreCase)));
    }
}