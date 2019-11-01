using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Api.Hubs
{
    public abstract class EntityBaseHub<TEntity>: BaseHub
    {
        public override async Task OnConnectedAsync()
        {
            await SendAllClients("Get", GetAllEntity());
            await base.OnConnectedAsync();
        }

        private async Task UpdateEntity(Task task)
        {
            try
            {
                await task;
                await SendAllClients("Get", GetAllEntity());
            }
            catch (Exception e)
            {
                await SendToCurrentClient("Error", e.Message);
            }
        }

        public async Task Create(TEntity entity) => UpdateEntity(CreateEntity(entity));

        public async Task Update(TEntity entity) => UpdateEntity(UpdateEntity(entity));
        
        public async Task Delete(Guid id) => UpdateEntity(DeleteEntity(id));
        
        protected abstract IEnumerable<TEntity> GetAllEntity();
        protected abstract TEntity GetEntityById();
        
        public abstract Task CreateEntity(TEntity entity);
        public abstract Task UpdateEntity(TEntity entity);
        public abstract Task DeleteEntity(Guid id);
    }
}