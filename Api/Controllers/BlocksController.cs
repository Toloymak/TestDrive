﻿using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    using Core.Logic.Blocks;
    using Core.Logic.Dtos;

    [Route("api/[controller]")]
    [ApiController]
    public class BlocksController : ControllerBase
    {
        private readonly BlockReader blockReader;
        private readonly BlockWriter blockWriter;
        
        public BlocksController(BlockWriter blockWriter,
                                BlockReader blockReader)
        {
            this.blockWriter = blockWriter;
            this.blockReader = blockReader;
        }

        /// <summary>
        /// Get all blocks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var result = this.blockReader.GetAllDto();
            return Ok(result);
        }
        
        /// <summary>
        /// Create block
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody] BlockDto dto)
        {
            var result = blockWriter.Create(dto);
            return Ok(result);
        }
        
        /// <summary>
        /// Get all blocks with included links
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("links")]
        public IActionResult GetLinks()
        {
            var blocks = blockReader.GetAllBlocksWithLink();
            return Ok(blocks);
        }
    }
}
