namespace BundlePay.Api.Dtos;

public sealed class BundleSummaryDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = default!;
    public string? Description { get; init; }
    public decimal Price { get; init; }
    public decimal OriginalPrice { get; init; }
    public decimal Savings { get; init; }
    public List<BundlePlatformDto> Platforms { get; init; } = [];
    public List<string> Features { get; init; } = [];
    public string Category { get; init; } = default!;
    public string? Image { get; init; }
    public string? ImageAlt { get; init; }
    public bool Popular { get; init; }
}
