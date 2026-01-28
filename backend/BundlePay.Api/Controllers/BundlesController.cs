using BundlePay.Api.Queries;
using Microsoft.AspNetCore.Mvc;

namespace BundlePay.Api.Controllers;

[ApiController]
[Route("api/bundles")]
public class BundlesController : ControllerBase
{
    private readonly BundlesQuery _bundlesQuery;

    public BundlesController(BundlesQuery bundlesQuery)
    {
        _bundlesQuery = bundlesQuery;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var bundles = await _bundlesQuery.GetBundlesAsync();
        return Ok(bundles);
    }
}
