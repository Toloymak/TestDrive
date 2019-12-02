namespace Core.Logic.Base
{
    using System;
    using System.Linq;

    using AutoMapper;

    using DataLayer;
    using DataLayer.Entities;

    using Microsoft.EntityFrameworkCore;

    public class DbHandlerBase<TEntity> where TEntity : BaseEntity
    {
        protected readonly DriveContext DriveContext;
        protected readonly IMapper Mapper;
        
        protected DbHandlerBase(DriveContext driveContext, IMapper mapper)
        {
            this.DriveContext = driveContext;
            this.Mapper = mapper;
        }
        
        protected TEntity Get(Guid id) =>
            this.DriveContext.Set<TEntity>().Find(id);

        protected IQueryable<TEntity> All =>
            this.DriveContext.Set<TEntity>().AsNoTracking();
    }
}