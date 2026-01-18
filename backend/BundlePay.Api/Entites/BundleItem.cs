namespace BundlePay.Api.Entites;

public class BundleItem
{
    public Guid BundleId { get; set; }
    public Bundle Bundle { get; set; } = default!;

    public Guid ServiceId { get; set; }
    public Service Service { get; set; } = default!;

    public int SortOrder { get; set; } = 0;
    public int Quantity { get; set; } = 1;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}
