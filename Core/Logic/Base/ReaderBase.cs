using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

namespace DatabaseLayer.Entities.Base
{
    public class ReaderBase<TEntry>: DbHandlerBase<TEntry> where TEntry : EntityBase
    {
        public ReaderBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }

        protected IList<TDto> GetAllDto<TDto>() => Mapper.Map<IList<TDto>>(this.All);
        protected TDto GetDto<TDto>(Guid id) => Mapper.Map<TDto>(base.Get(id));

    }
}