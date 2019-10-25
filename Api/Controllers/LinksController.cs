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
        private readonly LinkReader linkReader;
        
        public LinksController(LinkWriter linkWriter,
                               LinkReader linkReader)
        {
            this.linkWriter = linkWriter;
            this.linkReader = linkReader;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var links = linkReader.GetAllDto();
            return Ok(links);
        }

        [HttpGet]
        [Route("likeFront")]
        public IActionResult GetFrontLinks()
        {
            var models = linkReader.GetAllFrontLinkModels();
            return Ok(models);
        }
        
        [HttpPost]
        public IActionResult Put([FromBody] LinkDto linkDto)
        {
            var linkId = linkWriter.Create(linkDto);
            return Ok(linkId);
        }
    }
}
