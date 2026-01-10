'use client';

import { useState, useEffect } from 'react';
import FilterPanel, { FilterState } from './FilterPanel';
import BundleGrid from './BundleGrid';
import { Bundle } from './BundleCard';
import Icon from '@/components/ui/AppIcon';
import BundleComparisonPanel from '@/components/common/BundleComparisonPanel';

const BundleCatalogInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [allBundles] = useState<Bundle[]>([
  {
    id: '1',
    name: 'Entertainment Plus Bundle',
    description: 'Stream unlimited movies, TV shows, and exclusive originals across top entertainment platforms.',
    price: 29.99,
    originalPrice: 44.97,
    savings: 14.98,
    platforms: [
    { name: 'Netflix', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", logoAlt: 'Netflix logo with red N on black background' },
    { name: 'Disney+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1829e958d-1764662431997.png", logoAlt: 'Disney Plus logo with blue streaming icon' },
    { name: 'Hulu', logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471", logoAlt: 'Hulu logo with green text on white background' }],

    features: ['4K Ultra HD streaming', 'Ad-free experience', 'Download for offline viewing', 'Multiple user profiles', 'Exclusive original content'],
    rating: 4.8,
    reviewCount: 2847,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1669301048918-6ca9a3cd39c1",
    imageAlt: 'Modern living room with large TV displaying streaming content, comfortable gray sofa and ambient lighting',
    popular: true
  },
  {
    id: '2',
    name: 'Sports Fanatic Package',
    description: 'Never miss a game with comprehensive coverage of live sports, replays, and exclusive sports content.',
    price: 39.99,
    originalPrice: 59.97,
    savings: 19.98,
    platforms: [
    { name: 'ESPN+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png", logoAlt: 'ESPN Plus logo with red sports icon' },
    { name: 'DAZN', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13063443a-1765209264479.png", logoAlt: 'DAZN logo with yellow text on black background' },
    { name: 'NBA League Pass', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_115eee28c-1767992355950.png", logoAlt: 'NBA League Pass logo with basketball icon' }],

    features: ['Live sports streaming', 'Full game replays', 'Multi-angle camera views', 'Real-time stats and scores', 'Exclusive interviews'],
    rating: 4.6,
    reviewCount: 1923,
    category: 'Sports',
    image: "https://images.unsplash.com/photo-1576250223658-05e6e593d8ce",
    imageAlt: 'Basketball court with players in action during intense game under bright stadium lights',
    popular: true
  },
  {
    id: '3',
    name: 'Kids & Family Bundle',
    description: 'Safe, educational, and entertaining content for children of all ages with parental controls.',
    price: 24.99,
    originalPrice: 34.97,
    savings: 9.98,
    platforms: [
    { name: 'Disney+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1829e958d-1764662431997.png", logoAlt: 'Disney Plus logo with blue streaming icon' },
    { name: 'Nickelodeon', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7dfdb48-1765285781059.png", logoAlt: 'Nickelodeon logo with orange splat design' },
    { name: 'PBS Kids', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3b79438-1767992353841.png", logoAlt: 'PBS Kids logo with colorful educational theme' }],

    features: ['Age-appropriate content', 'Parental controls', 'Educational programming', 'No ads', 'Download for travel'],
    rating: 4.9,
    reviewCount: 3421,
    category: 'Kids & Family',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd5e3e25-1764671590828.png",
    imageAlt: 'Happy family with two children watching animated content together on tablet in cozy home setting'
  },
  {
    id: '4',
    name: 'Premium Movie Collection',
    description: 'Access to the latest blockbusters, classic films, and exclusive premieres from premium channels.',
    price: 34.99,
    originalPrice: 49.97,
    savings: 14.98,
    platforms: [
    { name: 'HBO Max', logo: "https://images.unsplash.com/photo-1678483789104-202dc8f9eb62", logoAlt: 'HBO Max logo with purple gradient design' },
    { name: 'Paramount+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_128195105-1767992352597.png", logoAlt: 'Paramount Plus logo with mountain peak icon' },
    { name: 'Peacock', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11c9a28e1-1765288251845.png", logoAlt: 'Peacock logo with colorful feather design' }],

    features: ['Same-day theatrical releases', '4K HDR quality', 'Dolby Atmos sound', 'Exclusive premieres', 'Extensive movie library'],
    rating: 4.7,
    reviewCount: 2156,
    category: 'Premium',
    image: "https://images.unsplash.com/photo-1699134816591-b4104e23eaa9",
    imageAlt: 'Home theater setup with large screen showing movie scene, surround sound speakers and comfortable seating'
  },
  {
    id: '5',
    name: 'News & Documentary Hub',
    description: 'Stay informed with 24/7 news coverage and award-winning documentaries from trusted sources.',
    price: 19.99,
    originalPrice: 29.97,
    savings: 9.98,
    platforms: [
    { name: 'CNN+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d19642-1767992352315.png", logoAlt: 'CNN Plus logo with red news icon' },
    { name: 'Discovery+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_164d48efc-1764657498538.png", logoAlt: 'Discovery Plus logo with blue globe design' },
    { name: 'National Geographic', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17ef49e68-1766829735462.png", logoAlt: 'National Geographic logo with yellow border frame' }],

    features: ['Live news streaming', 'On-demand documentaries', 'Breaking news alerts', 'Expert analysis', 'Global coverage'],
    rating: 4.5,
    reviewCount: 1687,
    category: 'News & Documentaries',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1481fdfbe-1764649592082.png",
    imageAlt: 'Professional news studio with multiple monitors displaying live broadcasts and world map graphics'
  },
  {
    id: '6',
    name: 'Music & Concert Bundle',
    description: 'Unlimited music streaming and exclusive live concert performances from your favorite artists.',
    price: 27.99,
    originalPrice: 39.97,
    savings: 11.98,
    platforms: [
    { name: 'Spotify Premium', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_103538331-1766476082722.png", logoAlt: 'Spotify Premium logo with green circular icon' },
    { name: 'Apple Music', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5490539-1764691471621.png", logoAlt: 'Apple Music logo with red musical note' },
    { name: 'YouTube Music', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_19ebf75e2-1767809984493.png", logoAlt: 'YouTube Music logo with red play button' }],

    features: ['Ad-free music streaming', 'Offline downloads', 'High-quality audio', 'Live concert access', 'Personalized playlists'],
    rating: 4.8,
    reviewCount: 3892,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1722332998970-f2335db8ab6d",
    imageAlt: 'Live concert with crowd enjoying performance, colorful stage lights and energetic atmosphere'
  },
  {
    id: '7',
    name: 'Fitness & Wellness Package',
    description: 'Transform your health with guided workouts, yoga sessions, and wellness content from top instructors.',
    price: 22.99,
    originalPrice: 32.97,
    savings: 9.98,
    platforms: [
    { name: 'Peloton Digital', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1407a4938-1767992350969.png", logoAlt: 'Peloton Digital logo with red P icon' },
    { name: 'Apple Fitness+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_147c41589-1767992350896.png", logoAlt: 'Apple Fitness Plus logo with activity rings' },
    { name: 'Daily Burn', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d00a4434-1767992352267.png", logoAlt: 'Daily Burn logo with orange flame icon' }],

    features: ['Live and on-demand classes', 'Multiple workout types', 'Progress tracking', 'Nutrition guidance', 'Community support'],
    rating: 4.7,
    reviewCount: 2341,
    category: 'Entertainment',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16575d52c-1766819138693.png",
    imageAlt: 'Modern home gym with yoga mat, dumbbells and person doing workout following online fitness class'
  },
  {
    id: '8',
    name: 'Gaming & Esports Bundle',
    description: 'Access to gaming content, esports tournaments, and exclusive gaming community features.',
    price: 32.99,
    originalPrice: 47.97,
    savings: 14.98,
    platforms: [
    { name: 'Twitch Turbo', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1be08056f-1767345487728.png", logoAlt: 'Twitch Turbo logo with purple glitch icon' },
    { name: 'YouTube Gaming', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13f1dc8ca-1766514206811.png", logoAlt: 'YouTube Gaming logo with red controller icon' },
    { name: 'Discord Nitro', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15272de9a-1767992352592.png", logoAlt: 'Discord Nitro logo with blue chat bubble' }],

    features: ['Ad-free streaming', 'Exclusive emotes', 'HD streaming quality', 'Tournament access', 'Community perks'],
    rating: 4.6,
    reviewCount: 1876,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1708032565079-f43e698f4db9",
    imageAlt: 'Gaming setup with RGB lighting, multiple monitors showing esports tournament and gaming peripherals'
  },
  {
    id: '9',
    name: 'International Content Bundle',
    description: 'Explore global entertainment with international shows, movies, and content from around the world.',
    price: 26.99,
    originalPrice: 37.97,
    savings: 10.98,
    platforms: [
    { name: 'Netflix', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", logoAlt: 'Netflix logo with red N on black background' },
    { name: 'Viki', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1823aa15a-1767992352297.png", logoAlt: 'Viki logo with heart icon for Asian content' },
    { name: 'MHz Choice', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15ebb6605-1767992351961.png", logoAlt: 'MHz Choice logo with international flag design' }],

    features: ['Multilingual subtitles', 'International originals', 'Cultural documentaries', 'Foreign language learning', 'Global news'],
    rating: 4.5,
    reviewCount: 1543,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1722573783625-eceb04251036",
    imageAlt: 'Diverse group of people watching international content with subtitles on large screen in modern apartment'
  },
  {
    id: '10',
    name: 'Educational Learning Bundle',
    description: 'Expand your knowledge with courses, tutorials, and educational content from leading platforms.',
    price: 29.99,
    originalPrice: 44.97,
    savings: 14.98,
    platforms: [
    { name: 'MasterClass', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0628770-1767992351962.png", logoAlt: 'MasterClass logo with graduation cap icon' },
    { name: 'Coursera Plus', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14f242c9c-1766745563246.png", logoAlt: 'Coursera Plus logo with blue book icon' },
    { name: 'LinkedIn Learning', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_143751a03-1764688271468.png", logoAlt: 'LinkedIn Learning logo with professional development theme' }],

    features: ['Expert-led courses', 'Certificates of completion', 'Skill assessments', 'Career development', 'Unlimited access'],
    rating: 4.9,
    reviewCount: 4123,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1713998740833-f76168c04676",
    imageAlt: 'Student taking online course on laptop with notebooks and coffee in bright study space'
  },
  {
    id: '11',
    name: 'Anime & Manga Collection',
    description: 'Dive into the world of anime with extensive libraries of classic and new series plus manga content.',
    price: 21.99,
    originalPrice: 31.97,
    savings: 9.98,
    platforms: [
    { name: 'Crunchyroll', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b72158bc-1764922584930.png", logoAlt: 'Crunchyroll logo with orange anime character icon' },
    { name: 'Funimation', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_152960ab2-1765085105922.png", logoAlt: 'Funimation logo with purple streaming icon' },
    { name: 'VRV', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1282442-1767992353601.png", logoAlt: 'VRV logo with colorful geometric design' }],

    features: ['Simulcast episodes', 'Dubbed and subbed content', 'Manga reader', 'Offline viewing', 'Ad-free streaming'],
    rating: 4.8,
    reviewCount: 3654,
    category: 'Entertainment',
    image: "https://images.unsplash.com/photo-1558259264-4b90e1616e5c",
    imageAlt: 'Anime fan watching colorful animated series on TV with manga collection displayed on shelf'
  },
  {
    id: '12',
    name: 'Cooking & Food Network Bundle',
    description: 'Master culinary skills with cooking shows, recipes, and food content from celebrity chefs.',
    price: 18.99,
    originalPrice: 26.97,
    savings: 7.98,
    platforms: [
    { name: 'Food Network', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d118738e-1767114687254.png", logoAlt: 'Food Network logo with chef hat icon' },
    { name: 'Tasty+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1331410ca-1767992352270.png", logoAlt: 'Tasty Plus logo with cooking utensils design' },
    { name: 'MasterClass', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1300ee2d2-1767992353106.png", logoAlt: 'MasterClass logo with culinary theme' }],

    features: ['Step-by-step recipes', 'Cooking competitions', 'Chef tutorials', 'Meal planning tools', 'Shopping lists'],
    rating: 4.6,
    reviewCount: 1987,
    category: 'Entertainment',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13fba65c6-1766816197390.png",
    imageAlt: 'Professional chef preparing gourmet meal in modern kitchen following online cooking tutorial'
  }]
  );

  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>(allBundles);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...allBundles];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((bundle) =>
      filters.categories.includes(bundle.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    if (filters.platforms.length > 0) {
      filtered = filtered.filter((bundle) =>
      bundle.platforms.some((platform) =>
      filters.platforms.includes(platform.name.toLowerCase().replace(/\s+/g, ''))
      )
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) {
      filtered = filtered.filter(
        (bundle) => bundle.price >= filters.priceRange[0] && bundle.price <= filters.priceRange[1]
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    setFilteredBundles(filtered);
  };

  const handleAddToCart = (bundleId: string) => {
    const bundle = allBundles.find((b) => b.id === bundleId);
    if (bundle) {
      setCartNotification(`${bundle.name} added to cart!`);
      setTimeout(() => setCartNotification(null), 3000);
    }
  };

  const handleToggleWishlist = (bundleId: string) => {
    setWishlistIds((prev) =>
    prev.includes(bundleId) ?
    prev.filter((id) => id !== bundleId) :
    [...prev, bundleId]
    );
  };

  const handleToggleCompare = (bundleId: string) => {
    setComparisonIds((prev) => {
      const newIds = prev.includes(bundleId) ?
      prev.filter((id) => id !== bundleId) :
      [...prev, bundleId];

      if (newIds.length > 0) {
        setIsComparisonOpen(true);
      }

      return newIds;
    });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8">
          <div className="flex gap-6">
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-card rounded-lg p-6 shadow-cinematic animate-pulse">
                <div className="h-6 bg-muted rounded w-1/2 mb-6" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-10 bg-card rounded mb-6 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) =>
                <div key={i} className="bg-card rounded-lg overflow-hidden shadow-cinematic animate-pulse">
                    <div className="h-48 bg-muted" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
            Bundle Catalog
          </h1>
          <p className="text-text-secondary">
            Discover and compare the perfect streaming bundle for your entertainment needs
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              onFilterChange={handleFilterChange}
              totalResults={filteredBundles.length} />

          </div>

          {/* Bundle Grid */}
          <div className="flex-1">
            {/* Mobile Filter & Sort */}
            <div className="lg:hidden mb-6">
              <FilterPanel
                onFilterChange={handleFilterChange}
                totalResults={filteredBundles.length} />

            </div>

            {/* Results Count */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{filteredBundles.length}</span> bundles
              </p>
              {comparisonIds.length > 0 &&
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth">

                  <Icon name="ScaleIcon" size={20} variant="outline" />
                  <span>Compare ({comparisonIds.length})</span>
                </button>
              }
            </div>

            <BundleGrid
              bundles={filteredBundles}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              wishlistIds={wishlistIds}
              comparisonIds={comparisonIds} />

          </div>
        </div>
      </div>

      {/* Comparison Panel */}
      <BundleComparisonPanel
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)} />


      {/* Cart Notification */}
      {cartNotification &&
      <div className="fixed bottom-6 right-6 z-140 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-cinematic-lg flex items-center gap-3 animate-slide-up">
          <Icon name="CheckCircleIcon" size={24} variant="solid" />
          <span className="font-medium">{cartNotification}</span>
        </div>
      }

      {/* Floating Compare Button - Mobile */}
      {comparisonIds.length > 0 &&
      <button
        onClick={() => setIsComparisonOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-130 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-cinematic-lg hover:shadow-glow-primary transition-smooth flex items-center justify-center">

          <Icon name="ScaleIcon" size={24} variant="outline" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {comparisonIds.length}
          </span>
        </button>
      }
    </div>);

};

export default BundleCatalogInteractive;