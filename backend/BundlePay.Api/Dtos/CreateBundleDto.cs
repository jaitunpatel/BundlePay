using BundlePay.Api.Enums;

namespace BundlePay.Api.Dtos;

public sealed class CreateBundleDto
{
    public string Name { get; init; } = default!;
    public string? Description { get; init; }
    public decimal Price { get; init; }
    public string? ImageUrl { get; init; }
    public BundleType BundleType { get; init; } = BundleType.Template;
    public List<Guid> ServiceIds { get; init; } = new();
}
