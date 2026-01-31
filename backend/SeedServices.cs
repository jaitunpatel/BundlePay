using BundlePay.Api.Database;
using BundlePay.Api.Entites;
using BundlePay.Api.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((context, config) =>
    {
        if (context.HostingEnvironment.IsDevelopment())
        {
            config.AddUserSecrets<Program>();
        }
    })
    .ConfigureServices((context, services) =>
    {
        var cs = context.Configuration.GetConnectionString("Default");
        services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(cs));
    });

var host = builder.Build();

using var scope = host.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

var services = new List<(string Name, string ImageUrl, decimal Price)>
{
    ("Netflix", "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", 15.99m),
    ("Disney+", "https://img.rocket.new/generatedImages/rocket_gen_img_1829e958d-1764662431997.png", 7.99m),
    ("Hulu", "https://images.unsplash.com/photo-1662466984595-4cef19b73471", 14.99m),
    ("ESPN+", "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png", 9.99m),
    ("DAZN", "https://img.rocket.new/generatedImages/rocket_gen_img_13063443a-1765209264479.png", 19.99m),
    ("NBA League Pass", "https://img.rocket.new/generatedImages/rocket_gen_img_115eee28c-1767992355950.png", 29.99m),
    ("Nickelodeon", "https://img.rocket.new/generatedImages/rocket_gen_img_1e7dfdb48-1765285781059.png", 5.99m),
    ("PBS Kids", "https://img.rocket.new/generatedImages/rocket_gen_img_1c3b79438-1767992353841.png", 4.99m),
    ("HBO Max", "https://images.unsplash.com/photo-1678483789104-202dc8f9eb62", 14.99m),
    ("Paramount+", "https://img.rocket.new/generatedImages/rocket_gen_img_128195105-1767992352597.png", 9.99m),
    ("Peacock", "https://img.rocket.new/generatedImages/rocket_gen_img_11c9a28e1-1765288251845.png", 4.99m),
    ("CNN+", "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d19642-1767992352315.png", 5.99m),
    ("Discovery+", "https://img.rocket.new/generatedImages/rocket_gen_img_164d48efc-1764657498538.png", 4.99m),
    ("National Geographic", "https://img.rocket.new/generatedImages/rocket_gen_img_17ef49e68-1766829735462.png", 2.99m),
    ("Spotify Premium", "https://img.rocket.new/generatedImages/rocket_gen_img_103538331-1766476082722.png", 9.99m),
    ("Apple Music", "https://img.rocket.new/generatedImages/rocket_gen_img_1e5490539-1764691471621.png", 9.99m),
    ("YouTube Music", "https://img.rocket.new/generatedImages/rocket_gen_img_19ebf75e2-1767809984493.png", 9.99m),
    ("Peloton Digital", "https://img.rocket.new/generatedImages/rocket_gen_img_1407a4938-1767992350969.png", 12.99m),
    ("Apple Fitness+", "https://img.rocket.new/generatedImages/rocket_gen_img_147c41589-1767992350896.png", 9.99m),
    ("Daily Burn", "https://img.rocket.new/generatedImages/rocket_gen_img_1d00a4434-1767992352267.png", 14.99m),
    ("Twitch Turbo", "https://img.rocket.new/generatedImages/rocket_gen_img_1be08056f-1767345487728.png", 8.99m),
    ("YouTube Gaming", "https://img.rocket.new/generatedImages/rocket_gen_img_13f1dc8ca-1766514206811.png", 2.99m),
    ("Discord Nitro", "https://img.rocket.new/generatedImages/rocket_gen_img_15272de9a-1767992352592.png", 9.99m),
    ("Viki", "https://img.rocket.new/generatedImages/rocket_gen_img_1823aa15a-1767992352297.png", 5.99m),
    ("MHz Choice", "https://img.rocket.new/generatedImages/rocket_gen_img_15ebb6605-1767992351961.png", 7.99m),
    ("MasterClass", "https://img.rocket.new/generatedImages/rocket_gen_img_1e0628770-1767992351962.png", 180m), // annual, but set to 15
    ("Coursera Plus", "https://img.rocket.new/generatedImages/rocket_gen_img_14f242c9c-1766745563246.png", 59m), // set to 20
    ("LinkedIn Learning", "https://img.rocket.new/generatedImages/rocket_gen_img_143751a03-1764688271468.png", 29.99m),
    ("Crunchyroll", "https://img.rocket.new/generatedImages/rocket_gen_img_1b72158bc-1764922584930.png", 7.99m),
    ("Funimation", "https://img.rocket.new/generatedImages/rocket_gen_img_152960ab2-1765085105922.png", 5.99m),
    ("VRV", "https://img.rocket.new/generatedImages/rocket_gen_img_1f1282442-1767992353601.png", 9.99m),
    ("Food Network", "https://img.rocket.new/generatedImages/rocket_gen_img_1d118738e-1767114687254.png", 7.99m),
    ("Tasty+", "https://img.rocket.new/generatedImages/rocket_gen_img_1331410ca-1767992352270.png", 3.99m)
};

foreach (var (name, imageUrl, price) in services)
{
    var existing = await db.Services.FirstOrDefaultAsync(s => s.Name == name);
    if (existing != null)
    {
        existing.ImageUrl = imageUrl;
        existing.Price = price;
        Console.WriteLine($"Updated {name}");
    }
    else
    {
        db.Services.Add(new Service
        {
            Name = name,
            ImageUrl = imageUrl,
            Price = price,
            ServiceStatus = ServiceStatus.Active
        });
        Console.WriteLine($"Added {name}");
    }
}

await db.SaveChangesAsync();
Console.WriteLine("Seeding completed.");