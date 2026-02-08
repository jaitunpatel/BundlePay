namespace BundlePay.Api.Entites;

public class Cart : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid BundleId { get; set; }
    public Bundle Bundle { get; set; } = default!;
}
