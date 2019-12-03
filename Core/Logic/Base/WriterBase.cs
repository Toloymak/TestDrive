namespace Core.Logic.Base
{
    using System;

    using AutoMapper;

    using DataLayer;
    using DataLayer.Entities;

    public class WriterBase<TEntry, TDto>: DbHandlerBase<TEntry> where TEntry : BaseEntity
    {
        protected WriterBase(DriveContext driveContext, IMapper mapper) : base(driveContext, mapper)
        {
        }
        
        public virtual Guid Create(TDto dto, bool needSave = true)
        {
            var entity = this.Mapper.Map<TEntry>(dto);
            return Create(entity, needSave);
        }
        
        public virtual Guid Create(TEntry entity, bool needSave = true)
        {
            this.DriveContext.Add(entity);
            if (needSave)
            {
                this.DriveContext.SaveChanges();
            }
            
            return entity.Id;
        }
        
        public virtual Guid Update(TDto dto, bool needSave = true)
        {
            var entity = this.Mapper.Map<TEntry>(dto);
            return Update(entity, needSave);
        }
        
        public virtual Guid Update(TEntry entity, bool needSave = true)
        {
            this.DriveContext.Update(entity);
            if (needSave)
            {
                this.DriveContext.SaveChanges();
            }
            
            return entity.Id;
        }

        public bool Delete(Guid id, bool needSave = true)
        {
            var entity = this.DriveContext.Set<TEntry>().Find(id);
            
            this.DriveContext.Remove(entity);
            
            if (needSave)
                this.DriveContext.SaveChanges();
            
            return true;
        }
    }
}