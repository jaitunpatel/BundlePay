using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.BundleItems;

public class EditModel : PageModel
{
    private readonly AppDbContext _db;

    public EditModel(AppDbContext db)
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
        if (!ModelState.IsValid)
        {
            await LoadNamesAsync();
            return Page();
        }

        _db.Attach(BundleItem).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }

    private async Task LoadNamesAsync()
    {
        var bundle = await _db.Bundles.AsNoTracking().FirstOrDefaultAsync(b => b.Id == BundleItem.BundleId);
        var service = await _db.Services.AsNoTracking().FirstOrDefaultAsync(s => s.Id == BundleItem.ServiceId);
        BundleName = bundle?.Name ?? string.Empty;
        ServiceName = service?.Name ?? string.Empty;
    }
}
