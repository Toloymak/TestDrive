using System;
using Core.Logic.Links;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    using Core.Dtos;

    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly LinkWriter linkWriter;
        private readonly LinkReader linkReader;
        
        public LinksController(LinkWriter linkWriter,
                               LinkReader linkReader)
        {
            this.linkWriter = linkWriter;
            this.linkReader = linkReader;
        }
        
        /// <summary>
        /// Get all links
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var links = linkReader.GetAllDto();
            return Ok(links);
        }

        /// <summary>
        /// Create link
        /// </summary>
        /// <param name="linkDto"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create([FromBody] LinkDto linkDto)
        {
            var linkId = linkWriter.Create(linkDto);
            return Ok(linkId);
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            linkWriter.Delete(id);
            return Ok();
        }
    }
}
