using System;
using System.Collections.Generic;
using Core.Logic.Links;
using DatabaseLayer.Entities.Blocks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly LinkWriter linkWriter;
        private readonly BlockReader blockReader;
        private readonly LinkReader linkReader;
        
        public LinksController(LinkWriter linkWriter,
                               BlockReader blockReader,
                               LinkReader linkReader)
        {
            this.linkWriter = linkWriter;
            this.blockReader = blockReader;
            this.linkReader = linkReader;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var links = linkReader.GetAllDto();
            return Ok(links);
        }
        
        [HttpPost]
        public IActionResult Put([FromBody] LinkDto linkDto)
        {
            var linkId = linkWriter.Create(linkDto);
            return Ok(linkId);
        }
    }
}
