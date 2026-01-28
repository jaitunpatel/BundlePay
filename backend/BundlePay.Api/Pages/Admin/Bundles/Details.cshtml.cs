using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BundlePay.Api.Pages.Admin.Bundles;

public class DetailsModel : PageModel
{
    private readonly AppDbContext _db;

    public DetailsModel(AppDbContext db)
    {
        _db = db;
    }

    public Bundle Bundle { get; private set; } = new();

    public async Task<IActionResult> OnGetAsync(Guid id)
    {
        var bundle = await _db.Bundles.FindAsync(id);
        if (bundle is null)
        {
            return NotFound();
        }

        Bundle = bundle;
        return Page();
    }
}
