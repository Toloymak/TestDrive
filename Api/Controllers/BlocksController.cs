using System;
using System.Collections.Generic;
using AutoMapper;
using DatabaseLayer.Entities.Blocks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlocksController : ControllerBase
    {
        private readonly BlockReader blockReader;
        private readonly BlockWriter blockWriter;
        
        public BlocksController(BlockWriter blockWriter, BlockReader blockReader)
        {
            this.blockWriter = blockWriter;
            this.blockReader = blockReader;
        }
        
        [HttpGet]
        public IActionResult Get(Guid? id)
        {
            if (!id.HasValue)
                return Ok(this.blockReader.GetAll);

            var block = this.blockReader.Get(id.Value);
            if (block is null)
                return BadRequest();

            return Ok(block);
        }
        
        [HttpPut]
        public IActionResult Post(BlockDto dto)
        {
            var result = this.blockWriter.Create(dto);
            return Ok(result);
        }
    }
}
