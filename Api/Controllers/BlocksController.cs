using System;
using System.Collections.Generic;
using Api.Hubs;
using AutoMapper;
using DatabaseLayer.Entities.Blocks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

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
        
        [HttpPut]
        public IActionResult Post(BlockDto dto)
        {
            var result = this.blockWriter.Create(dto);
            return Ok(result);
        }
    }
}
