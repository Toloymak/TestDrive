namespace Core.Logic.Contexts
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Core.Dtos;
    using Core.Logic.Base;

    using DataLayer;
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class ContextReader: ReaderBase<Context, ContextDto>
    {
        public ContextReader(DriveContext driveContext, IMapper mapper) 
            : base(driveContext, mapper)
        {
        }

        public IList<ContextWithLinksDto> GetAllContextsWithLinks()
        {
            var contexts = this.Mapper.Map<IList<ContextWithLinksDto>>(
                this.All
                    .Include(b => b.Links));
            
            return contexts;
        }
        
        public ContextWithLinksDto GetContextWithLinks(Guid id)
        {
            var context = this.Mapper.Map<ContextWithLinksDto>(
                this.All
                    .Include(b => b.Links)
                    .First(b => b.Id == id));
            
            return context;
        }

        public ContextDto GetByName(string name) => this.Mapper.Map<ContextDto>(
            this.All
                .FirstOrDefault(b => string.Equals(
                    b.Name,
                    name,
                    StringComparison.OrdinalIgnoreCase)));
    }
}