namespace Api.Controllers
{
    using Core.Logic.Users;

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly UserReader userReader;

        public UserController(UserReader userReader)
        {
            this.userReader = userReader;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var users = userReader.GetAllDto();
            
            return Ok(users);
        }
    }
}