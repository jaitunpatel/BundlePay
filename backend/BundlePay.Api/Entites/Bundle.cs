namespace BundlePay.Api.Entites;

public class Bundle
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Name { get; set; } = default!;
    public string? Description { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Many-to-many via join table
    public ICollection<BundleItem> Items { get; set; } = new List<BundleItem>();

}
