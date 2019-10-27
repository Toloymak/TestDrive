using System;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;

namespace Core.Managers
{
    public class FrontManager
    {
        private readonly LinkReader linkReader;
        private readonly LinkWriter linkWriter;
        private readonly BlockReader blockReader;
        private readonly BlockWriter blockWriter;

        public FrontManager(LinkReader linkReader,
                            LinkWriter linkWriter,
                            BlockReader blockReader,
                            BlockWriter blockWriter)
        {
            this.linkReader = linkReader;
            this.linkWriter = linkWriter;
            this.blockReader = blockReader;
            this.blockWriter = blockWriter;
        }

        public void CreateLink(FrontLinkModel frontLinkModel)
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

        public void UpdateLink(FrontLinkModel frontLinkModel, LinkDto linkDto)
        {
            linkDto.Title = frontLinkModel.Description;
            linkDto.Url = frontLinkModel.Url;
            linkDto.Priority = 0;
            
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