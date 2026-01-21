using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BundlePay.Api.Controllers;

[ApiController]
[Route("api/bundles")]
public class BundlesController : Controller
{
    [HttpGet]
    [Authorize]
    public IActionResult Get() 
    {
        var userId = User.FindFirst("sub")?.Value;
        return Ok(new { userId });
    }
}
