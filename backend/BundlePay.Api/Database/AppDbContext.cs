using BundlePay.Api.Entites;
using Microsoft.EntityFrameworkCore;

namespace BundlePay.Api.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Bundle> Bundles => Set<Bundle>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<BundleItem> BundleItems => Set<BundleItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Service>()
            .HasIndex(x => x.Name)
            .IsUnique();

        modelBuilder.Entity<BundleItem>()
            .HasKey(x => new { x.BundleId, x.ServiceId });

        modelBuilder.Entity<BundleItem>()
            .HasOne(x => x.Bundle)
            .WithMany(b => b.Items)
            .HasForeignKey(x => x.BundleId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BundleItem>()
            .HasOne(x => x.Service)
            .WithMany(s => s.BundleItems)
            .HasForeignKey(x => x.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BundleItem>()
            .HasIndex(x => x.BundleId);

        modelBuilder.Entity<BundleItem>()
            .HasIndex(x => x.ServiceId);
    }
}
