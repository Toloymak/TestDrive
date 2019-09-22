using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return null;
        }
        
        [HttpGet]
        public IActionResult Put()
        {
            return null;
        }
    }
}
