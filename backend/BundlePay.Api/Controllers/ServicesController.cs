using BundlePay.Api.Queries;
using Microsoft.AspNetCore.Mvc;

namespace BundlePay.Api.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
    private readonly ServicesQuery _servicesQuery;

    public ServicesController(ServicesQuery servicesQuery)
    {
        _servicesQuery = servicesQuery;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var services = await _servicesQuery.GetServicesAsync();
        return Ok(services);
    }
}