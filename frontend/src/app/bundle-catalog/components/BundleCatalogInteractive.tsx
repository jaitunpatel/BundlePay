'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { WAITLIST_MODE } from "@/lib/flag";
import FilterPanel, { FilterState } from './FilterPanel';
import BundleGrid from './BundleGrid';
import { Bundle } from './BundleCard';
import Icon from '@/components/ui/AppIcon';
import BundleComparisonPanel from '@/components/common/BundleComparisonPanel';

type ApiPlatform = {
  name: string;
  logo: string | null;
  logoAlt: string | null;
};

type ApiBundle = {
  id: string;
  name: string;
  description: string;
  bundlePrice: number;
  totalPlatformsPrice: number;
  savings: number;
  platforms: ApiPlatform[];
  is_active: boolean;
  created_at: string;
};

type Props = {
  apiBundles: ApiBundle[];
};

const BundleCatalogInteractive = ({ apiBundles }: Props) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const templateBundles: Bundle[] = [
  {
    id: 'template-1',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],

    features: ['4K Ultra HD streaming', 'Ad-free experience', 'Download for offline viewing', 'Multiple user profiles', 'Exclusive original content'],
    rating: 4.8,
    reviewCount: 2847,
    category: 'Entertainment',
    popular: true
  },
  {
    id: 'template-2',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Live sports streaming', 'Full game replays', 'Multi-angle camera views', 'Real-time stats and scores', 'Exclusive interviews'],
    rating: 4.6,
    reviewCount: 1923,
    category: 'Sports',
    popular: true
  },
  {
    id: 'template-3',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Age-appropriate content', 'Parental controls', 'Educational programming', 'No ads', 'Download for travel'],
    rating: 4.9,
    reviewCount: 3421,
    category: 'Kids & Family',
  },
  {
    id: 'template-4',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Same-day theatrical releases', '4K HDR quality', 'Dolby Atmos sound', 'Exclusive premieres', 'Extensive movie library'],
    rating: 4.7,
    reviewCount: 2156,
    category: 'Premium',
  },
  {
    id: 'template-5',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Live news streaming', 'On-demand documentaries', 'Breaking news alerts', 'Expert analysis', 'Global coverage'],
    rating: 4.5,
    reviewCount: 1687,
    category: 'News & Documentaries',
  },
  {
    id: 'template-6',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Ad-free music streaming', 'Offline downloads', 'High-quality audio', 'Live concert access', 'Personalized playlists'],
    rating: 4.8,
    reviewCount: 3892,
    category: 'Entertainment',
  },
  {
    id: 'template-7',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Live and on-demand classes', 'Multiple workout types', 'Progress tracking', 'Nutrition guidance', 'Community support'],
    rating: 4.7,
    reviewCount: 2341,
    category: 'Entertainment',
  },
  {
    id: 'template-8',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Ad-free streaming', 'Exclusive emotes', 'HD streaming quality', 'Tournament access', 'Community perks'],
    rating: 4.6,
    reviewCount: 1876,
    category: 'Entertainment',
  },
  {
    id: 'template-9',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Multilingual subtitles', 'International originals', 'Cultural documentaries', 'Foreign language learning', 'Global news'],
    rating: 4.5,
    reviewCount: 1543,
    category: 'Entertainment',
  },
  {
    id: 'template-10',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Expert-led courses', 'Certificates of completion', 'Skill assessments', 'Career development', 'Unlimited access'],
    rating: 4.9,
    reviewCount: 4123,
    category: 'Entertainment',
  },
  {
    id: 'template-11',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Simulcast episodes', 'Dubbed and subbed content', 'Manga reader', 'Offline viewing', 'Ad-free streaming'],
    rating: 4.8,
    reviewCount: 3654,
    category: 'Entertainment',
  },
  {
    id: 'template-12',
    name: '',
    description: '',
    bundlePrice: 0,
    totalPlatformsPrice: 0,
    savings: 0,
    platforms: [
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' },
    { name: '', logo: "", logoAlt: '' }],


    features: ['Step-by-step recipes', 'Cooking competitions', 'Chef tutorials', 'Meal planning tools', 'Shopping lists'],
    rating: 4.6,
    reviewCount: 1987,
    category: 'Entertainment',
  }
  ];

const allBundles: Bundle[] =
  apiBundles && apiBundles.length > 0
    ? apiBundles.map((b, i) => {
        const t = templateBundles[i % templateBundles.length];
        return {
          ...t,
          id: b.id,
          name: b.name,
          description: b.description,
          bundlePrice: b.bundlePrice,
          totalPlatformsPrice: b.totalPlatformsPrice,
          savings: b.savings,
          platforms: b.platforms,
        };
      })
    : templateBundles;

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

    if (filters.platforms.length > 0) {
      filtered = filtered.filter((bundle) =>
      bundle.platforms.some((platform) =>
      filters.platforms.includes(platform.name.toLowerCase().replace(/\s+/g, ''))
      )
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.bundlePrice - b.bundlePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.bundlePrice - a.bundlePrice);
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
    if (WAITLIST_MODE) {
      router.push("/waitlist?from=/bundle-catalog");
      return;
    }
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
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
            Bundle Catalog
          </h1>
          <p className="text-text-secondary">
            Discover and compare the perfect streaming bundle for your entertainment needs
          </p>
          {WAITLIST_MODE && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              🔒 Early access preview. Join the waitlist to subscribe.
            </div>
          )}
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