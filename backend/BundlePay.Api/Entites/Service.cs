using BundlePay.Api.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BundlePay.Api.Entites;

public class Service : BaseEntity
{
    [Required, MaxLength(140)]
    public string Name { get; set; } = default!;
    public ServiceStatus ServiceStatus { get; set; } = ServiceStatus.Active;
    public ServiceCategory ServiceCategory { get; set; }
    
    [Column(TypeName = "numeric(12,2)")]
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<BundleItem> BundleItems { get; set; } = [];
}

