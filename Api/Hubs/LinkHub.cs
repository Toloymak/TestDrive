namespace Api.Hubs
{
    using System;
    using System.Threading.Tasks;

    using Core.Logic.Contexts;
    using Core.Logic.Dtos;
    using Core.Logic.Links;

    using Microsoft.AspNetCore.SignalR;

    public class LinkHub: BaseHub
    {
        private readonly LinkReader linkReader;
        private readonly LinkWriter linkWriter;
        private readonly ContextReader contextReader;

        public LinkHub(LinkReader linkReader, LinkWriter linkWriter, ContextReader contextReader)
        {
            this.linkReader = linkReader;
            this.linkWriter = linkWriter;
            this.contextReader = contextReader;
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
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Context не найден в базе");
            }

            linkWriter.Update(linkDto);
            await SendMessageToAllClients();
        }
        
        public async Task Delete(Guid id)
        {
            var oldLink = linkReader.GetDto(id);
            if (oldLink == null)
            {
                await Clients.Client(this.Context.ConnectionId).SendAsync("Error", "Context не найден в базе");
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
            var contexts = this.contextReader.GetAllContextsWithLinks();
            await Clients.All.SendAsync("Get", contexts);
        }
    }
}