using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.BundleItems;

public class DetailsModel : PageModel
{
    private readonly AppDbContext _db;

    public DetailsModel(AppDbContext db)
    {
        _db = db;
    }

    public BundleItem BundleItem { get; private set; } = new();

    public async Task<IActionResult> OnGetAsync(Guid bundleId, Guid serviceId)
    {
        var bundleItem = await _db.BundleItems
            .Include(bi => bi.Bundle)
            .Include(bi => bi.Service)
            .FirstOrDefaultAsync(bi => bi.BundleId == bundleId && bi.ServiceId == serviceId);

        if (bundleItem is null)
        {
            return NotFound();
        }

        BundleItem = bundleItem;
        return Page();
    }
}
