using System;
using AutoMapper;
using DatabaseLayer.Entities.Blocks;

namespace DatabaseLayer.Entities.Base
{
    public class WriterBase<TEntry, TDto>: DbHandlerBase<TEntry> where TEntry : EntityBase
    {
        protected WriterBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
        
        public Guid Create(TDto dto, bool needSave = true)
        {
            var entity = this.Mapper.Map<TEntry>(dto);
            this.DriveContext.Add(entity);
            if (needSave)
            {
                this.DriveContext.SaveChanges();
            }
            
            return entity.Id;
        }
        
        public Guid Update(TDto dto, bool needSave = true)
        {
            var entity = this.Mapper.Map<TEntry>(dto);
            this.DriveContext.Update(entity);
            if (needSave)
            {
                this.DriveContext.SaveChanges();
            }
            
            return entity.Id;
        }
    }
}