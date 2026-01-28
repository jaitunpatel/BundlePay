using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BundlePay.Api.Pages.Admin.Services;

public class DeleteModel : PageModel
{
    private readonly AppDbContext _db;

    public DeleteModel(AppDbContext db)
    {
        _db = db;
    }

    [BindProperty]
    public Service Service { get; set; } = new();

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

    public async Task<IActionResult> OnPostAsync()
    {
        var service = await _db.Services.FindAsync(Service.Id);
        if (service is null)
        {
            return NotFound();
        }

        _db.Services.Remove(service);
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
