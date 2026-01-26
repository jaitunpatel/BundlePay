using BundlePay.Api.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BundlePay.Api.Entites;

public class Bundle : BaseEntity
{
    public BundleType BundleType { get; set; }
    public Guid? OwnerUserId { get; set; }
    
    [Required, MaxLength(140)]
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    
    [Column(TypeName = "numeric(12,2)")]
    public decimal Price { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<BundleItem> Items { get; set; } = [];
}
