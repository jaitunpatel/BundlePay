using BundlePay.Api.Queries;
using BundlePay.Api.Dtos;
using BundlePay.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BundlePay.Api.Controllers;

[ApiController]
[Route("api/bundles")]
public class BundlesController : ControllerBase
{
    private readonly BundlesQuery _bundlesQuery;
    private readonly BundleService _bundleService;

    public BundlesController(BundlesQuery bundlesQuery, BundleService bundleService)
    {
        _bundlesQuery = bundlesQuery;
        _bundleService = bundleService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var bundles = await _bundlesQuery.GetBundlesAsync();
        return Ok(bundles);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateBundleDto dto)
    {
        var sub = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
        if (string.IsNullOrWhiteSpace(sub) || !Guid.TryParse(sub, out var userId))
            return Unauthorized(new { message = "Unauthorized" });

        try
        {
            await _bundleService.CreateBundleAsync(dto, userId);
            return Ok(true);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
