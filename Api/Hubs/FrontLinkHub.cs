using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Core.Logic.Links;
using Core.Managers;
using DatabaseLayer.Entities.Blocks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class FrontLinkHub: Hub
    {
        private readonly LinkReader linkReader;
        private readonly FrontManager frontManager;
        private readonly LinkWriter linkWriter;

        public FrontLinkHub(LinkReader linkReader,
                        FrontManager frontManager,
                        LinkWriter linkWriter)
        {
            this.linkReader = linkReader;
            this.frontManager = frontManager;
            this.linkWriter = linkWriter;
        }
        
        public override async Task OnConnectedAsync()
        {
            await SendMessageToAllClients();

            await base.OnConnectedAsync();
        }
        
        public async Task SendMessage(string user, FrontLinkModel frontLinkModel)
        {
            var linkDto = linkReader.GetByLink(frontLinkModel.Url);
            
            if (linkDto == null)
                frontManager.CreateLink(frontLinkModel);
            else
                frontManager.UpdateLink(frontLinkModel, linkDto);

            await SendMessageToAllClients();
        }
        
        public async Task DeleteMessage(Guid id)
        {
            linkWriter.Delete(id);
            
            await SendMessageToAllClients();
        }

        private async Task SendMessageToAllClients()
        {
            var links = linkReader.GetAllFrontLinkModels();
            
            await Clients.Client(this.Context.ConnectionId).SendAsync("Get", links);
        }
    }
}