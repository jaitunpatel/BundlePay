using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BundlePay.Api.Pages.Admin.Bundles;

public class DeleteModel : PageModel
{
    private readonly AppDbContext _db;

    public DeleteModel(AppDbContext db)
    {
        _db = db;
    }

    [BindProperty]
    public Bundle Bundle { get; set; } = new();

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
        var bundle = await _db.Bundles.FindAsync(Bundle.Id);
        if (bundle is null)
        {
            return NotFound();
        }

        _db.Bundles.Remove(bundle);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
