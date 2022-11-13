using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EW.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly ILogger<UploadsController> _logger;
        public UploadsController(ILogger<UploadsController> logger)
        {
            _logger = logger;
        }
    }
}
