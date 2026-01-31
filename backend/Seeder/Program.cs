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
        // if (context.HostingEnvironment.IsDevelopment())
        // {
        //     config.AddUserSecrets<Program>();
        // }
    })
    .ConfigureServices((context, services) =>
    {
        var cs = context.Configuration.GetConnectionString("Default");
        services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(cs));
        Console.WriteLine("Starting seeder..." + cs);
    });
var host = builder.Build();

using var scope = host.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

var bundles = new List<(string Name, string? Description, decimal Price, BundleType BundleType, List<string> Platforms)>
{
    ("Entertainment Bundle", "Stream your favorite movies and shows with this comprehensive entertainment package.", 29.99m, BundleType.Template, new List<string> { "Netflix", "Disney+", "Hulu" }),
    ("Sports Bundle", "Never miss a game with live sports streaming from top leagues.", 39.99m, BundleType.Template, new List<string> { "ESPN+", "DAZN", "NBA League Pass" }),
    ("Kids & Family Bundle", "Safe, educational, and entertaining content for the whole family.", 24.99m, BundleType.Template, new List<string> { "Disney+", "Nickelodeon", "PBS Kids" }),
    ("Premium Bundle", "Experience the best in premium streaming with blockbuster movies and series.", 34.99m, BundleType.Template, new List<string> { "HBO Max", "Paramount+", "Peacock" }),
    ("News & Documentaries Bundle", "Stay informed with global news and award-winning documentaries.", 19.99m, BundleType.Template, new List<string> { "CNN+", "Discovery+", "National Geographic" }),
    ("Music Bundle", "Access millions of songs with premium music streaming services.", 27.99m, BundleType.Template, new List<string> { "Spotify Premium", "Apple Music", "YouTube Music" }),
    ("Fitness Bundle", "Get fit with world-class workouts and fitness programs.", 22.99m, BundleType.Template, new List<string> { "Peloton Digital", "Apple Fitness+", "Daily Burn" }),
    ("Gaming Bundle", "Enhance your gaming experience with premium gaming perks.", 32.99m, BundleType.Template, new List<string> { "Twitch Turbo", "YouTube Gaming", "Discord Nitro" }),
    ("International Bundle", "Explore global content with international streaming services.", 26.99m, BundleType.Template, new List<string> { "Netflix", "Viki", "MHz Choice" }),
    ("Learning Bundle", "Expand your knowledge with expert-led courses and certifications.", 29.99m, BundleType.Template, new List<string> { "MasterClass", "Coursera Plus", "LinkedIn Learning" }),
    ("Anime Bundle", "Dive into the world of anime with simulcast episodes and manga.", 21.99m, BundleType.Template, new List<string> { "Crunchyroll", "Funimation", "VRV" }),
    ("Cooking Bundle", "Master culinary skills with recipes, tutorials, and cooking shows.", 18.99m, BundleType.Template, new List<string> { "Food Network", "Tasty+", "MasterClass" })
};

foreach (var (bundleName, description, bundlePrice, bundleType, platformNames) in bundles)
{
    var existingBundle = await db.Bundles.FirstOrDefaultAsync(b => b.Name == bundleName);
    if (existingBundle == null)
    {
        var bundle = new Bundle
        {
            Name = bundleName,
            Description = description,
            Price = bundlePrice,
            BundleType = bundleType,
            IsActive = true
        };
        db.Bundles.Add(bundle);
        await db.SaveChangesAsync(); // Save to get Id
        Console.WriteLine($"Added bundle {bundleName}");

        int sortOrder = 0;
        foreach (var platformName in platformNames)
        {
            var service = await db.Services.FirstOrDefaultAsync(s => s.Name == platformName);
            if (service != null)
            {
                db.BundleItems.Add(new BundleItem
                {
                    BundleId = bundle.Id,
                    ServiceId = service.Id,
                    Quantity = 1,
                    SortOrder = sortOrder++
                });
            }
        }
        await db.SaveChangesAsync();
    }
    else
    {
        Console.WriteLine($"Bundle {bundleName} already exists, skipping.");
}

var services = new List<(string Name, string ImageUrl, decimal Price, ServiceCategory Category)>
{
    ("Netflix", "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", 15.99m, ServiceCategory.Entertainment),
    ("Disney+", "https://img.rocket.new/generatedImages/rocket_gen_img_1829e958d-1764662431997.png", 7.99m, ServiceCategory.Entertainment),
    ("Hulu", "https://images.unsplash.com/photo-1662466984595-4cef19b73471", 14.99m, ServiceCategory.Entertainment),
    ("ESPN+", "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png", 9.99m, ServiceCategory.Sports),
    ("DAZN", "https://img.rocket.new/generatedImages/rocket_gen_img_13063443a-1765209264479.png", 19.99m, ServiceCategory.Sports),
    ("NBA League Pass", "https://img.rocket.new/generatedImages/rocket_gen_img_115eee28c-1767992355950.png", 29.99m, ServiceCategory.Sports),
    ("Nickelodeon", "https://img.rocket.new/generatedImages/rocket_gen_img_1e7dfdb48-1765285781059.png", 5.99m, ServiceCategory.Kids),
    ("PBS Kids", "https://img.rocket.new/generatedImages/rocket_gen_img_1c3b79438-1767992353841.png", 4.99m, ServiceCategory.Kids),
    ("HBO Max", "https://images.unsplash.com/photo-1678483789104-202dc8f9eb62", 14.99m, ServiceCategory.Premium),
    ("Paramount+", "https://img.rocket.new/generatedImages/rocket_gen_img_128195105-1767992352597.png", 9.99m, ServiceCategory.Premium),
    ("Peacock", "https://img.rocket.new/generatedImages/rocket_gen_img_11c9a28e1-1765288251845.png", 4.99m, ServiceCategory.Premium),
    ("CNN+", "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d19642-1767992352315.png", 5.99m, ServiceCategory.News),
    ("Discovery+", "https://img.rocket.new/generatedImages/rocket_gen_img_164d48efc-1764657498538.png", 4.99m, ServiceCategory.News),
    ("National Geographic", "https://img.rocket.new/generatedImages/rocket_gen_img_17ef49e68-1766829735462.png", 2.99m, ServiceCategory.News),
    ("Spotify Premium", "https://img.rocket.new/generatedImages/rocket_gen_img_103538331-1766476082722.png", 9.99m, ServiceCategory.Music),
    ("Apple Music", "https://img.rocket.new/generatedImages/rocket_gen_img_1e5490539-1764691471621.png", 9.99m, ServiceCategory.Music),
    ("YouTube Music", "https://img.rocket.new/generatedImages/rocket_gen_img_19ebf75e2-1767809984493.png", 9.99m, ServiceCategory.Music),
    ("Peloton Digital", "https://img.rocket.new/generatedImages/rocket_gen_img_1407a4938-1767992350969.png", 12.99m, ServiceCategory.Fitness),
    ("Apple Fitness+", "https://img.rocket.new/generatedImages/rocket_gen_img_147c41589-1767992350896.png", 9.99m, ServiceCategory.Fitness),
    ("Daily Burn", "https://img.rocket.new/generatedImages/rocket_gen_img_1d00a4434-1767992352267.png", 14.99m, ServiceCategory.Fitness),
    ("Twitch Turbo", "https://img.rocket.new/generatedImages/rocket_gen_img_1be08056f-1767345487728.png", 8.99m, ServiceCategory.Gaming),
    ("YouTube Gaming", "https://img.rocket.new/generatedImages/rocket_gen_img_13f1dc8ca-1766514206811.png", 2.99m, ServiceCategory.Gaming),
    ("Discord Nitro", "https://img.rocket.new/generatedImages/rocket_gen_img_15272de9a-1767992352592.png", 9.99m, ServiceCategory.Gaming),
    ("Viki", "https://img.rocket.new/generatedImages/rocket_gen_img_1823aa15a-1767992352297.png", 5.99m, ServiceCategory.International),
    ("MHz Choice", "https://img.rocket.new/generatedImages/rocket_gen_img_15ebb6605-1767992351961.png", 7.99m, ServiceCategory.International),
    ("MasterClass", "https://img.rocket.new/generatedImages/rocket_gen_img_1e0628770-1767992351962.png", 180m, ServiceCategory.Learning), // annual, but set to 15
    ("Coursera Plus", "https://img.rocket.new/generatedImages/rocket_gen_img_14f242c9c-1766745563246.png", 59m, ServiceCategory.Learning), // set to 20
    ("LinkedIn Learning", "https://img.rocket.new/generatedImages/rocket_gen_img_143751a03-1764688271468.png", 29.99m, ServiceCategory.Learning),
    ("Crunchyroll", "https://img.rocket.new/generatedImages/rocket_gen_img_1b72158bc-1764922584930.png", 7.99m, ServiceCategory.Anime),
    ("Funimation", "https://img.rocket.new/generatedImages/rocket_gen_img_152960ab2-1765085105922.png", 5.99m, ServiceCategory.Anime),
    ("VRV", "https://img.rocket.new/generatedImages/rocket_gen_img_1f1282442-1767992353601.png", 9.99m, ServiceCategory.Anime),
    ("Food Network", "https://img.rocket.new/generatedImages/rocket_gen_img_1d118738e-1767114687254.png", 7.99m, ServiceCategory.Cooking),
    ("Tasty+", "https://img.rocket.new/generatedImages/rocket_gen_img_1331410ca-1767992352270.png", 3.99m, ServiceCategory.Cooking)
};

foreach (var (name, imageUrl, price, category) in services)
{
    var existing = await db.Services.FirstOrDefaultAsync(s => s.Name == name);
    if (existing != null)
    {
        existing.ImageUrl = imageUrl;
        existing.Price = price;
        existing.ServiceCategory = category;
        Console.WriteLine($"Updated {name}");
    }
    else
    {
        db.Services.Add(new Service
        {
            Name = name,
            ImageUrl = imageUrl,
            Price = price,
            ServiceStatus = ServiceStatus.Active,
            ServiceCategory = category
        });
        Console.WriteLine($"Added {name}");
    }
}

await db.SaveChangesAsync();

Console.WriteLine("Seeding completed.");
}
