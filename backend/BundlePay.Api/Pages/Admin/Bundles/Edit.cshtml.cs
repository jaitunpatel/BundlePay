using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using BundlePay.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.Bundles;

public class EditModel : PageModel
{
    private readonly AppDbContext _db;

    public EditModel(AppDbContext db)
    {
        _db = db;
        BundleTypes = new SelectList(Enum.GetValues<BundleType>());
    }

    [BindProperty]
    public Bundle Bundle { get; set; } = new();

    public SelectList BundleTypes { get; }

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

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _db.Attach(Bundle).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
