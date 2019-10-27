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
        /// Get links for old react front, which are used in websockets
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("likeFront")]
        public IActionResult GetFrontLinks()
        {
            var models = linkReader.GetAllFrontLinkModels();
            return Ok(models);
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
    }
}
