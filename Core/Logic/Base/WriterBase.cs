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

        public bool Delete(Guid id)
        {
            var entity = this.DriveContext.Set<TEntry>().Find(id);
            
            this.DriveContext.Remove(entity);
            this.DriveContext.SaveChanges();
            
            return true;
        }
    }
}