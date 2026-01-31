using System.Data;
using BundlePay.Api.Dtos;
using Dapper;

namespace BundlePay.Api.Queries;

public sealed class ServicesQuery
{
    private readonly IDbConnection _db;
    private readonly string _getListSql;

    public ServicesQuery(IDbConnection db, IHostEnvironment env)
    {
        _db = db;
        _getListSql = LoadSql(env.ContentRootPath, "Sql", "Services.GetList.sql");
    }

    public async Task<IReadOnlyList<ServiceDto>> GetServicesAsync()
    {
        if (_db.State != ConnectionState.Open)
        {
            _db.Open();
        }

        var services = await _db.QueryAsync<ServiceDto>(_getListSql);
        return services.ToList();
    }

    private static string LoadSql(string rootPath, params string[] parts)
    {
        var path = Path.Combine(new[] { rootPath }.Concat(parts).ToArray());
        return File.ReadAllText(path);
    }
}