using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

namespace DatabaseLayer.Entities.Base
{
    using Microsoft.EntityFrameworkCore;

    public class ReaderBase<TEntry, TDto>: DbHandlerBase<TEntry> where TEntry : EntityBase
    {
        public ReaderBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }

        public IList<TDto> GetAllDto() => Mapper.Map<IList<TDto>>(this.All.AsNoTracking());
        public TDto GetDto(Guid id) => Mapper.Map<TDto>(this.All.AsNoTracking().FirstOrDefault(x => x.Id == id));
    }
}