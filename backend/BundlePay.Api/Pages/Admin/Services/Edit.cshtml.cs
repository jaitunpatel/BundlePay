using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using BundlePay.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.Services;

public class EditModel : PageModel
{
    private readonly AppDbContext _db;

    public EditModel(AppDbContext db)
    {
        _db = db;
        Statuses = new SelectList(Enum.GetValues<ServiceStatus>());
    }

    [BindProperty]
    public Service Service { get; set; } = new();

    public SelectList Statuses { get; }

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
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _db.Attach(Service).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
