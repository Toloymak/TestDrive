namespace Core.Logic.Base
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using DataLayer;
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class ReaderBase<TEntry, TDto>: DbHandlerBase<TEntry> where TEntry : BaseEntity
    {
        public ReaderBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }

        public virtual IList<TDto> GetAllDto()
        {
            return this.Mapper.Map<IList<TDto>>(this.All.AsNoTracking());
        }

        public TDto GetDto(Guid id) => this.Mapper.Map<TDto>(this.All.AsNoTracking().FirstOrDefault(x => x.Id == id));
    }
}