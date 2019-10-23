using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Api.Models;
using Core.Logic.Link;
using DatabaseLayer.Entities.Blocks;
using DatabaseLayer.Entities.Link;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class BlockHub: Hub
    {
        private readonly BlockReader blockReader;
        private readonly LinkReader linkReader;
        
        private readonly BlockWriter blockWriter;
        private readonly LinkWriter linkWriter;
        public BlockHub(BlockReader blockReader,
                        LinkReader linkReader,
                        BlockWriter blockWriter,
                        LinkWriter linkWriter)
        {
            this.blockReader = blockReader;
            this.linkReader = linkReader;
            this.blockWriter = blockWriter;
            this.linkWriter = linkWriter;
        }
        
        public override async Task OnConnectedAsync()
        {
            var links = blockReader.GetAll.Select(b => new LinkHubModel
            {
                Id = 1,
                Description = b.Name,
                Service = b.Name,
                Url = b.Name
            });
            
            Thread.Sleep(3000);
            
            await this.Clients.Client(this.Context.ConnectionId).SendAsync("ReceiveMessage", links);
            await this.Clients.Client(this.Context.ConnectionId).SendAsync("Get", links);

            await base.OnConnectedAsync();
        }
        
        public async Task SendMessage(string user, LinkHubModel linkHubModel)
        {
            var blocks = blockReader.GetAll;

            var linkDto = new LinkDto
            {
                Id = Guid.NewGuid(),
                Url = linkHubModel.Url,
                Title = linkHubModel.Description,
                BlockId = blocks.FirstOrDefault().Id,
                Priority = 1
            };
            
            linkWriter.Create(linkDto);
            
            await Clients.All.SendAsync("ReceiveMessage", linkHubModel);
        }
    }
}