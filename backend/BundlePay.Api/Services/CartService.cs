using BundlePay.Api.Database;
using BundlePay.Api.Dtos;
using BundlePay.Api.Entites;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Services;

public class CartService
{
    private readonly AppDbContext _db;

    public CartService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Cart> AddToCartAsync(Guid userId, Guid bundleId)
    {
        // Check if bundle exists
        var bundleExists = await _db.Bundles.AnyAsync(b => b.Id == bundleId);
        if (!bundleExists)
            throw new InvalidOperationException("Bundle not found");

        // Check if item already exists in cart
        var existingCartItem = await _db.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.BundleId == bundleId);
        if (existingCartItem != null)
            throw new InvalidOperationException("Bundle is already in your cart");

        var cartItem = new Cart
        {
            UserId = userId,
            BundleId = bundleId
        };

        _db.Carts.Add(cartItem);
        await _db.SaveChangesAsync();

        return cartItem;
    }

    public async Task<bool> RemoveFromCartAsync(Guid userId, Guid bundleId)
    {
        var cartItem = await _db.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.BundleId == bundleId);
        if (cartItem == null)
            throw new InvalidOperationException("Item not found in cart");

        _db.Carts.Remove(cartItem);
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<List<Cart>> GetUserCartAsync(Guid userId)
    {
        return await _db.Carts
            .Include(c => c.Bundle)
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }
}
