using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    using Core.Dtos;
    using Core.Logic.Contexts;

    [Route("api/[controller]")]
    [ApiController]
    public class ContextsController : ControllerBase
    {
        private readonly ContextReader contextReader;
        private readonly ContextWriter contextWriter;
        
        public ContextsController(ContextWriter contextWriter,
                                ContextReader contextReader)
        {
            this.contextWriter = contextWriter;
            this.contextReader = contextReader;
        }

        /// <summary>
        /// Get all contexts
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var result = this.contextReader.GetAllDto();
            return Ok(result);
        }
        
        /// <summary>
        /// Create context
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody] ContextDto dto)
        {
            var result = this.contextWriter.Create(dto);
            return Ok(result);
        }
        
        /// <summary>
        /// Get all contexts with included links
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("links")]
        public IActionResult GetLinks()
        {
            var contexts = this.contextReader.GetAllContextsWithLinks();
            return Ok(contexts);
        }
    }
}
