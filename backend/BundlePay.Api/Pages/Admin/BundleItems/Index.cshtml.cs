using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Pages.Admin.BundleItems;

public class IndexModel : PageModel
{
    private readonly AppDbContext _db;

    public IndexModel(AppDbContext db)
    {
        _db = db;
    }

    public List<BundleItem> BundleItems { get; private set; } = [];

    public async Task OnGetAsync()
    {
        BundleItems = await _db.BundleItems
            .AsNoTracking()
            .Include(bi => bi.Bundle)
            .Include(bi => bi.Service)
            .OrderBy(bi => bi.Bundle.Name)
            .ThenBy(bi => bi.SortOrder)
            .ToListAsync();
    }
}
