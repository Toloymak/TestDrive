using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    using Core.Dtos;
    using Core.Logic.Contexts;

    public class ContextHub: BaseHub
    {
        private readonly ContextReader contextReader;
        private readonly ContextWriter contextWriter;

        public ContextHub(ContextReader contextReader, ContextWriter contextWriter)
        {
            this.contextReader = contextReader;
            this.contextWriter = contextWriter;
        }

        public override async Task OnConnectedAsync()
        {
            await SendMessageToAllClients();

            await base.OnConnectedAsync();
        }
        
        public async Task Create(ContextDto contextDto)
        {
            this.contextWriter.Create(contextDto);
            await SendMessageToAllClients();
        }

        public async Task Update(ContextDto contextDto)
        {
            var oldBlock = this.contextReader.GetDto(contextDto.Id.Value);
            if (oldBlock == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            this.contextWriter.Update(contextDto);
        }
        
        public async Task Delete(Guid id)
        {
            var oldBlock = this.contextReader.GetDto(id);
            if (oldBlock == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            this.contextWriter.Delete(id);
        }

        private async Task SendMessageToAllClients()
        {
            var blockDtos = this.contextReader.GetAllDto();
            await Clients.All.SendAsync("Get", blockDtos);
        }
    }
}