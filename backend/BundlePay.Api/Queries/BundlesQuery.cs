using System.Data;
using BundlePay.Api.Dtos;
using BundlePay.Api.Enums;
using Dapper;

namespace BundlePay.Api.Queries;

public sealed class BundlesQuery
{
    private readonly IDbConnection _db;
    private readonly string _getListSql;

    public BundlesQuery(IDbConnection db, IHostEnvironment env)
    {
        _db = db;
        _getListSql = LoadSql(env.ContentRootPath, "Sql", "Bundles.GetList.sql");
    }

    public async Task<IReadOnlyList<BundleSummaryDto>> GetBundlesAsync()
    {
        if (_db.State != ConnectionState.Open)
        {
            _db.Open();
        }

        var rows = await _db.QueryAsync<BundleRow>(_getListSql);
        var grouped = rows
            .GroupBy(r => new
            {
                r.BundleId,
                r.BundleName,
                r.BundleDescription,
                r.BundlePrice,
                r.BundleIsActive,
                r.BundleType,
                r.BundleImageUrl
            })
            .Select(g =>
            {
                var platforms = g
                    .Where(x => x.ServiceId.HasValue)
                    .OrderBy(x => x.ItemSortOrder ?? int.MaxValue)
                    .Select(x => new BundlePlatformDto
                    {
                        Name = x.ServiceName ?? string.Empty,
                        Logo = x.ServiceImageUrl,
                        LogoAlt = null
                    })
                    .ToList();

                var originalPrice = g.Sum(x => (x.ServicePrice ?? 0m) * (x.ItemQuantity ?? 1));
                var bundleType = Enum.IsDefined(typeof(BundleType), g.Key.BundleType)
                    ? ((BundleType)g.Key.BundleType).ToString()
                    : "Unknown";

                return new BundleSummaryDto
                {
                    Id = g.Key.BundleId,
                    Name = g.Key.BundleName,
                    Description = g.Key.BundleDescription,
                    Price = g.Key.BundlePrice,
                    OriginalPrice = originalPrice,
                    Savings = originalPrice - g.Key.BundlePrice,
                    Platforms = platforms,
                    Features = [],
                    Category = bundleType,
                    Image = g.Key.BundleImageUrl,
                    ImageAlt = null,
                    Popular = g.Key.BundleIsActive
                };
            })
            .ToList();

        return grouped;
    }

    private static string LoadSql(string rootPath, params string[] parts)
    {
        var path = Path.Combine(new[] { rootPath }.Concat(parts).ToArray());
        return File.ReadAllText(path);
    }

    private sealed class BundleRow
    {
        public Guid BundleId { get; init; }
        public string BundleName { get; init; } = default!;
        public string? BundleDescription { get; init; }
        public decimal BundlePrice { get; init; }
        public bool BundleIsActive { get; init; }
        public int BundleType { get; init; }
        public string? BundleImageUrl { get; init; }
        public DateTime BundleCreatedAt { get; init; }
        public int? ItemQuantity { get; init; }
        public int? ItemSortOrder { get; init; }
        public Guid? ServiceId { get; init; }
        public string? ServiceName { get; init; }
        public decimal? ServicePrice { get; init; }
        public string? ServiceImageUrl { get; init; }
    }
}
