using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.Services;

public class IndexModel : PageModel
{
    private readonly AppDbContext _db;

    public IndexModel(AppDbContext db)
    {
        _db = db;
    }

    public List<Service> Services { get; private set; } = [];

    public async Task OnGetAsync()
    {
        Services = await _db.Services
            .AsNoTracking()
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }
}
