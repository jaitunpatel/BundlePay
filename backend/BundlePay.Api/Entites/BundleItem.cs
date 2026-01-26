namespace BundlePay.Api.Entites;

public class BundleItem : BaseEntity
{
    public Guid BundleId { get; set; }
    public Bundle Bundle { get; set; } = default!;
    public Guid ServiceId { get; set; }
    public Service Service { get; set; } = default!;
    public int SortOrder { get; set; } = 0;
    public int Quantity { get; set; } = 1;
}
