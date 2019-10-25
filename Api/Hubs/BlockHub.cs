using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;
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
            var links = linkReader.GetAllFrontLinkModels();
            
            await this.Clients.Client(this.Context.ConnectionId).SendAsync("Get", links);

            await base.OnConnectedAsync();
        }
        
        public async Task SendMessage(string user, FrontLinkModel frontLinkModel)
        {
            var linkDto = linkReader.GetByLink(frontLinkModel.Url);
            if (linkDto == null)
                CreateLink(frontLinkModel);
            else
                UpdateLink(frontLinkModel, linkDto);
            
            await Clients.All.SendAsync("Get", frontLinkModel);
        }
        
        private void CreateLink(FrontLinkModel frontLinkModel)
        {
            var linkDto = new LinkDto
            {
                Title = frontLinkModel.Description,
                Url = frontLinkModel.Url,
                Priority = 0
            };

            SetBlockId(frontLinkModel, ref linkDto);
            var linkId = linkWriter.Create(linkDto);
        }

        private void UpdateLink(FrontLinkModel frontLinkModel, LinkDto linkDto)
        {
            linkDto = new LinkDto
            {
                Title = frontLinkModel.Description,
                Url = frontLinkModel.Url,
                Priority = 0
            };
            
            SetBlockId(frontLinkModel, ref linkDto);
            linkWriter.Update(linkDto);
        }

        private void SetBlockId(FrontLinkModel frontLinkModel, ref LinkDto linkDto)
        {
            var blockDto = blockReader.GetByName(frontLinkModel.Service);
            if (blockDto != null)
            {
                linkDto.BlockId = blockDto.Id ?? Guid.Empty;
            }
            else
            {
                var newBlockDto = new BlockDto
                {
                    Name = frontLinkModel.Service,
                    Priority = 0
                };

                linkDto.BlockId = blockWriter.Create(newBlockDto);
            }
        }
    }
}