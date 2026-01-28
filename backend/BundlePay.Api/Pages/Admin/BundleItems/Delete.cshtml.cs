using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.BundleItems;

public class DeleteModel : PageModel
{
    private readonly AppDbContext _db;

    public DeleteModel(AppDbContext db)
    {
        _db = db;
    }

    [BindProperty]
    public BundleItem BundleItem { get; set; } = new();

    public string BundleName { get; private set; } = string.Empty;
    public string ServiceName { get; private set; } = string.Empty;

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
        BundleName = bundleItem.Bundle.Name;
        ServiceName = bundleItem.Service.Name;
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        var bundleItem = await _db.BundleItems
            .FirstOrDefaultAsync(bi => bi.BundleId == BundleItem.BundleId && bi.ServiceId == BundleItem.ServiceId);

        if (bundleItem is null)
        {
            return NotFound();
        }

        _db.BundleItems.Remove(bundleItem);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
