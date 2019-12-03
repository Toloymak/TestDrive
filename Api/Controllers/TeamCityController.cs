using Core.Clients;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamCityController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetResponseFromTC(string configName)
        {
            var client = new TeamCityClient();
            var response = client.GetLastBuildStatus(configName);

            return Ok(response);
        }
    }
}