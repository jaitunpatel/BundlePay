using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using BundlePay.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BundlePay.Api.Pages.Admin.Bundles;

public class CreateModel : PageModel
{
    private readonly AppDbContext _db;

    public CreateModel(AppDbContext db)
    {
        _db = db;
        BundleTypes = new SelectList(Enum.GetValues<BundleType>());
    }

    [BindProperty]
    public Bundle Bundle { get; set; } = new();

    public SelectList BundleTypes { get; }

    public IActionResult OnGet()
    {
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _db.Bundles.Add(Bundle);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
