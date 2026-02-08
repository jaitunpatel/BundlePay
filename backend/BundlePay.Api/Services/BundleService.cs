using BundlePay.Api.Database;
using BundlePay.Api.Dtos;
using BundlePay.Api.Entites;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Services;

public class BundleService
{
    private readonly AppDbContext _db;

    public BundleService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Bundle> CreateBundleAsync(CreateBundleDto dto, Guid userId)
    {
        if (dto.ServiceIds == null || !dto.ServiceIds.Any())
            throw new InvalidOperationException("At least one service is required");

        var distinctIds = dto.ServiceIds.Distinct().ToList();
        var services = await _db.Services.Where(s => distinctIds.Contains(s.Id)).ToListAsync();
        
        if (services.Count != distinctIds.Count)
            throw new InvalidOperationException("One or more services not found");

        var bundle = new Bundle
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            ImageUrl = dto.ImageUrl,
            BundleType = dto.BundleType,
            OwnerUserId = userId,
            IsActive = true
        };

        _db.Bundles.Add(bundle);

        foreach (var sid in distinctIds)
        {
            var item = new BundleItem
            {
                Bundle = bundle,
                ServiceId = sid,
                Quantity = 1
            };
            _db.BundleItems.Add(item);
        }

        var cartItem = new Cart
        {
            UserId = userId,
            BundleId = bundle.Id
        };
        _db.Carts.Add(cartItem);

        await _db.SaveChangesAsync();

        return bundle;
    }
}
