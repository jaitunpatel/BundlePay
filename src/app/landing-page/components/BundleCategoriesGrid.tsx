import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  bundleCount: number;
  image: string;
  imageAlt: string;
  platforms: string[];
}

const BundleCategoriesGrid = () => {
  const categories: Category[] = [
  {
    id: '1',
    name: 'Entertainment',
    description: 'Movies, TV shows, and original series from top streaming platforms',
    icon: 'FilmIcon',
    bundleCount: 12,
    image: "https://images.unsplash.com/photo-1721733258344-b4532a81ca53",
    imageAlt: 'Person watching entertainment content on TV with popcorn in modern living room',
    platforms: ['Netflix', 'Disney+', 'Hulu', 'HBO Max']
  },
  {
    id: '2',
    name: 'Sports',
    description: 'Live games, replays, and exclusive sports content from major leagues',
    icon: 'TrophyIcon',
    bundleCount: 8,
    image: "https://images.unsplash.com/photo-1710806587787-0372461a18d1",
    imageAlt: 'Exciting basketball game with players in action on professional court',
    platforms: ['ESPN+', 'DAZN', 'NBA League Pass']
  },
  {
    id: '3',
    name: 'Family',
    description: 'Kid-friendly content with parental controls and educational programs',
    icon: 'UserGroupIcon',
    bundleCount: 10,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd5e3e25-1764671590828.png",
    imageAlt: 'Happy family with children enjoying animated content together on tablet',
    platforms: ['Disney+', 'Paramount+', 'Apple TV+']
  },
  {
    id: '4',
    name: 'International',
    description: 'Global content in multiple languages from around the world',
    icon: 'GlobeAltIcon',
    bundleCount: 15,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d75e315f-1766543863960.png",
    imageAlt: 'Diverse group of people watching international content on multiple devices',
    platforms: ['Hotstar', 'Viki', 'Crunchyroll']
  },
  {
    id: '5',
    name: 'News & Documentaries',
    description: 'Stay informed with news channels and documentary streaming services',
    icon: 'NewspaperIcon',
    bundleCount: 6,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_134886c9c-1767573172791.png",
    imageAlt: 'Professional news anchor presenting breaking news in modern studio',
    platforms: ['CNN+', 'Discovery+', 'CuriosityStream']
  },
  {
    id: '6',
    name: 'Music & Concerts',
    description: 'Live concerts, music videos, and exclusive performances',
    icon: 'MusicalNoteIcon',
    bundleCount: 7,
    image: "https://images.unsplash.com/photo-1727186495211-f68e1146e5bf",
    imageAlt: 'Live concert performance with artist on stage and crowd with lights',
    platforms: ['YouTube Premium', 'Tidal', 'Amazon Music']
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find the perfect bundle tailored to your entertainment preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) =>
          <Link
            key={category.id}
            href={`/bundle-catalog?category=${category.name.toLowerCase()}`}
            className="group bg-card rounded-xl overflow-hidden shadow-cinematic hover:shadow-cinematic-lg transition-smooth">

              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={category.image}
                alt={category.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name={category.icon as any} size={24} variant="outline" className="text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-text-secondary mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {category.platforms.slice(0, 3).map((platform, idx) =>
                <span key={idx} className="text-xs px-2 py-1 bg-muted text-text-secondary rounded">
                      {platform}
                    </span>
                )}
                  {category.platforms.length > 3 &&
                <span className="text-xs px-2 py-1 bg-muted text-text-secondary rounded">
                      +{category.platforms.length - 3}
                    </span>
                }
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {category.bundleCount} bundles available
                  </span>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-smooth">
                    <span className="text-sm font-medium">Explore</span>
                    <Icon name="ArrowRightIcon" size={16} variant="outline" />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/bundle-catalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-muted text-text-primary font-medium rounded-md hover:bg-input transition-smooth">

            <span>View All Categories</span>
            <Icon name="ArrowRightIcon" size={20} variant="outline" />
          </Link>
        </div>
      </div>
    </section>);

};

export default BundleCategoriesGrid;