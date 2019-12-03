namespace Api.Controllers
{
    using Core.Dtos;
    using Core.Logic.UserContexts;
    using Core.Logic.Users;

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly UserReader userReader;
        private readonly UserWriter userWriter;
        private readonly UserContextReader userContextReader;

        public UserController(UserReader userReader, UserWriter userWriter, UserContextReader userContextReader)
        {
            this.userReader = userReader;
            this.userWriter = userWriter;
            this.userContextReader = userContextReader;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var users = userReader.GetAllDto();
            
            return Ok(users);
        }
        
        [HttpPost]
        public IActionResult Post(UserDto userDto)
        {
            userWriter.Create(userDto);
            
            return Ok();
        }
        
        [HttpPatch]
        public IActionResult Patch(UserDto userDto)
        {
            userWriter.Update(userDto);
            
            return Ok();
        }
    }
}