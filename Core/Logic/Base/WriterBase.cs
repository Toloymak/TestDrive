using System;
using AutoMapper;
using DatabaseLayer.Entities.Blocks;

namespace DatabaseLayer.Entities.Base
{
    public class WriterBase<TEntry>: DbHandlerBase<TEntry> where TEntry : EntityBase
    {
        protected WriterBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
        
        public Guid Create<TDto>(TDto dto, bool needSave = true)
        {
            var entity = this.Mapper.Map<TEntry>(dto);
            this.DriveContext.Add(entity);
            if (needSave)
            {
                this.DriveContext.SaveChanges();
            }
            
            return entity.Id;
        }
    }
}