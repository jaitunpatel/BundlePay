using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BundlePay.Api.Pages.Admin.Services;

public class DetailsModel : PageModel
{
    private readonly AppDbContext _db;

    public DetailsModel(AppDbContext db)
    {
        _db = db;
    }

    public Service Service { get; private set; } = new();

    public async Task<IActionResult> OnGetAsync(Guid id)
    {
        var service = await _db.Services.FindAsync(id);
        if (service is null)
        {
            return NotFound();
        }

        Service = service;
        return Page();
    }
}
