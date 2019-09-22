using System;
using System.Linq;
using AutoMapper;

namespace DatabaseLayer.Entities.Base
{
    public class DbHandlerBase<TEntity> where TEntity : EntityBase
    {
        protected readonly DriveContext DriveContext;
        protected readonly IMapper Mapper;
        
        protected DbHandlerBase(DriveContext driveContext, IMapper mapper)
        {
            this.DriveContext = driveContext;
            Mapper = mapper;
        }
        
        protected TEntity Get(Guid id) =>
            this.DriveContext.Set<TEntity>().Find(id);

        protected IQueryable<TEntity> All =>
            this.DriveContext.Set<TEntity>();
    }
}