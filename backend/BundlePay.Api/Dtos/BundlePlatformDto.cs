namespace BundlePay.Api.Dtos;

public sealed class BundlePlatformDto
{
    public string Name { get; init; } = default!;
    public string? Logo { get; init; }
    public string? LogoAlt { get; init; }
}
