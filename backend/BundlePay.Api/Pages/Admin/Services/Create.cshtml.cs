using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using BundlePay.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BundlePay.Api.Pages.Admin.Services;

public class CreateModel : PageModel
{
    private readonly AppDbContext _db;

    public CreateModel(AppDbContext db)
    {
        _db = db;
        Statuses = new SelectList(Enum.GetValues<ServiceStatus>());
    }

    [BindProperty]
    public Service Service { get; set; } = new();

    public SelectList Statuses { get; }

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

        _db.Services.Add(Service);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
