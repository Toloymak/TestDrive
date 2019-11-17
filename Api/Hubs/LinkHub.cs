using System;
using System.Threading.Tasks;
using Core.Logic.Links;
using DatabaseLayer.Entities.Base;
using DatabaseLayer.Entities.Blocks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class LinkHub: BaseHub
    {
        private readonly LinkReader linkReader;
        private readonly LinkWriter linkWriter;
        private readonly BlockReader blockReader;

        public LinkHub(LinkReader linkReader, LinkWriter linkWriter, BlockReader blockReader)
        {
            this.linkReader = linkReader;
            this.linkWriter = linkWriter;
            this.blockReader = blockReader;
        }

        public override async Task OnConnectedAsync()
        {
            await SendMessageToAllClients();
            await base.OnConnectedAsync();
        }
        
        public async Task Create(LinkDto linkDto)
        {
            linkWriter.Create(linkDto);
            await SendMessageToAllClients();
        }

        public async Task Update(LinkDto linkDto)
        {
            var oldLink = linkReader.GetDto(linkDto.Id.Value);
            if (oldLink == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            linkWriter.Update(linkDto);
            await SendMessageToAllClients();
        }
        
        public async Task Delete(Guid id)
        {
            var oldLink = linkReader.GetDto(id);
            if (oldLink == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Block не найден в базе");
            }

            try
            {
                linkWriter.Delete(id);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            await SendMessageToAllClients();
        }

        private async Task SendMessageToAllClients()
        {
            var blocks = blockReader.GetAllBlocksWithLink();
            await Clients.All.SendAsync("Get", blocks);
        }
    }
}