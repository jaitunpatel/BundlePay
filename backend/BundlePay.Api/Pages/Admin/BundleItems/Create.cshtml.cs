using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.BundleItems;

public class CreateModel : PageModel
{
    private readonly AppDbContext _db;

    public CreateModel(AppDbContext db)
    {
        _db = db;
    }

    [BindProperty]
    public BundleItem BundleItem { get; set; } = new();

    public SelectList Bundles { get; private set; } = default!;
    public SelectList Services { get; private set; } = default!;

    public async Task OnGetAsync()
    {
        await LoadLookupsAsync();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            await LoadLookupsAsync();
            return Page();
        }

        _db.BundleItems.Add(BundleItem);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }

    private async Task LoadLookupsAsync()
    {
        var bundles = await _db.Bundles.AsNoTracking().OrderBy(b => b.Name).ToListAsync();
        var services = await _db.Services.AsNoTracking().OrderBy(s => s.Name).ToListAsync();
        Bundles = new SelectList(bundles, "Id", "Name");
        Services = new SelectList(services, "Id", "Name");
    }
}
