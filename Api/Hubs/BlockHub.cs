using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    using Core.Logic.Blocks;
    using Core.Logic.Dtos;

    public class BlockHub: BaseHub
    {
        private readonly BlockReader blockReader;
        private readonly BlockWriter blockWriter;

        public BlockHub(BlockReader blockReader, BlockWriter blockWriter)
        {
            this.blockReader = blockReader;
            this.blockWriter = blockWriter;
        }

        public override async Task OnConnectedAsync()
        {
            await SendMessageToAllClients();

            await base.OnConnectedAsync();
        }
        
        public async Task Create(BlockDto blockDto)
        {
            blockWriter.Create(blockDto);
            await SendMessageToAllClients();
        }

        public async Task Update(BlockDto blockDto)
        {
            var oldBlock = blockReader.GetDto(blockDto.Id.Value);
            if (oldBlock == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            blockWriter.Update(blockDto);
        }
        
        public async Task Delete(Guid id)
        {
            var oldBlock = blockReader.GetDto(id);
            if (oldBlock == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            blockWriter.Delete(id);
        }

        private async Task SendMessageToAllClients()
        {
            var blockDtos = blockReader.GetAllDto();
            await Clients.All.SendAsync("Get", blockDtos);
        }
    }
}