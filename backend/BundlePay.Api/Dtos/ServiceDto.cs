using BundlePay.Api.Enums;

namespace BundlePay.Api.Dtos;

public class ServiceDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public ServiceStatus ServiceStatus { get; set; }
    public ServiceCategory ServiceCategory { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
}