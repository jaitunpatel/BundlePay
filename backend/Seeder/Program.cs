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
}

Console.WriteLine("Seeding completed.");
