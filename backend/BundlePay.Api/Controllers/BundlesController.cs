using BundlePay.Api.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Controllers;

[ApiController]
[Route("api/bundles")]
public class BundlesController : ControllerBase
{
    private readonly AppDbContext _db;

    public BundlesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var bundles = await _db.Bundles
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new
            {
                b.Id,
                b.Name,
                b.Description,
                b.IsActive,
                b.CreatedAt
            })
            .ToListAsync();

        return Ok(bundles);
    }
}
