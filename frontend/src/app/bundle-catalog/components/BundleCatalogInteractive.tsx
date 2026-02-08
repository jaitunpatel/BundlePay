'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { WAITLIST_MODE } from "@/lib/flag";
import { AuthenticationError } from "@/lib/cartApi";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import BundleGrid from './BundleGrid';
import { Bundle } from './BundleCard';
import BuildYourOwnGrid from './BuildYourOwnGrid';
import Icon from '@/components/ui/AppIcon';
import BundleComparisonPanel from '@/components/common/BundleComparisonPanel';

type ApiPlatform = {
  name: string;
  logo: string | null;
  logoAlt: string | null;
};

type ApiService = {
  id: string;
  name: string;
  serviceStatus: number;
  serviceCategory: number;
  price: number;
  imageUrl: string | null;
};

type ApiBundle = {
  id: string;
  name: string;
  description: string;
  bundlePrice: number;
  totalPlatformsPrice: number;
  savings: number;
  platforms: ApiPlatform[];
  category?: string;
  popular?: boolean;
  features?: string[];
  reviewCount?: number;
  is_active: boolean;
  created_at: string;
};

type Props = {
  apiBundles: ApiBundle[];
  apiServices: ApiService[];
};

const BundleCatalogInteractive = ({ apiBundles, apiServices }: Props) => {
  const router = useRouter();
  const { loading, userEmail } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'premade' | 'custom'>('premade');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [cartNotification, setCartNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);

  const [selectedServiceCategory, setSelectedServiceCategory] = useState<number | null>(null);

  const SERVICE_CATEGORIES: { id: number; label: string }[] = [
    { id: 0, label: 'Entertainment' },
    { id: 1, label: 'Sports' },
    { id: 2, label: 'Kids' },
    { id: 3, label: 'Premium' },
    { id: 4, label: 'News' },
    { id: 5, label: 'Music' },
    { id: 6, label: 'Fitness' },
    { id: 7, label: 'Gaming' },
    { id: 8, label: 'International' },
    { id: 9, label: 'Learning' },
    { id: 10, label: 'Anime' },
    { id: 11, label: 'Cooking' },
  ];

  const allBundles: Bundle[] = (apiBundles ?? []).map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,

      bundlePrice: b.bundlePrice,
      totalPlatformsPrice: b.totalPlatformsPrice,
      savings: b.savings,
      platforms: b.platforms,

      features: b.features ?? [],
      reviewCount: b.reviewCount ?? 0,
      category: b.category ?? 'Template',
      popular: b.popular ?? false,
  }));

  const allServices = (apiServices ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price,
    imageUrl: s.imageUrl,
    serviceStatus: s.serviceStatus,
    serviceCategory: s.serviceCategory,
  }));

  const selectedCategoryLabel =
  selectedServiceCategory === null
    ? null
    : SERVICE_CATEGORIES.find(c => c.id === selectedServiceCategory)?.label ?? null;

  // Premade bundles filter (uses bundle.category string)
  const displayedBundles =
    selectedCategoryLabel === null
      ? allBundles
      : allBundles.filter(b => (b.category ?? '').toLowerCase() === selectedCategoryLabel.toLowerCase());

  // Custom services filter (uses serviceCategory number)
  const displayedServices =
    selectedServiceCategory === null
      ? allServices
      : allServices.filter(s => s.serviceCategory === selectedServiceCategory);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

  const handleAddToCart = async (bundleId: string) => {
    if (WAITLIST_MODE) {
      router.push("/waitlist?from=/bundle-catalog");
      return;
    }

    // Check if user is authenticated
    if (!userEmail) {
      router.push("/sign-in?from=/bundle-catalog");
      return;
    }

    setIsAddingToCart(bundleId);
    const bundle = allBundles.find((b) => b.id === bundleId);
    
    try {
      await addToCart(bundleId);
      setCartNotification({
        message: `${bundle?.name} added to cart!`,
        type: 'success',
      });
      setTimeout(() => setCartNotification(null), 3000);
    } catch (error) {
      let errorMessage = 'Failed to add to cart';
      
      if (error instanceof AuthenticationError) {
        // Redirect to sign-in if authentication fails
        router.push("/sign-in?from=/bundle-catalog");
        return;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setCartNotification({
        message: errorMessage,
        type: 'error',
      });
      setTimeout(() => setCartNotification(null), 3000);
    } finally {
      setIsAddingToCart(null);
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

    const CategoryPills = () => (
    <div className="mb-6 flex flex-wrap gap-2">
      {SERVICE_CATEGORIES.map((c) => {
        const isActive = selectedServiceCategory === c.id;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedServiceCategory(prev => (prev === c.id ? null : c.id))}
            className={[
              "rounded-full px-4 py-1.5 text-sm border transition-smooth",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-text-primary border-white/20 hover:border-white/40"
            ].join(" ")}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );

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

          {/* Tabs */}
          <div className="mt-6">
            <div className="inline-flex rounded-lg bg-muted/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('premade')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === 'premade'
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Pre-made Bundles
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === 'custom'
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Build Your Own
              </button>
            </div>
          </div>
          {WAITLIST_MODE && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              🔒 Early access preview. Join the waitlist to subscribe.
            </div>
          )}
        </div>

        {/* Main Content */}
        {activeTab === 'premade' && (
          <div>
            <BundleGrid
              bundles={displayedBundles}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              wishlistIds={wishlistIds}
              comparisonIds={comparisonIds}
              cartIds={cartItems.map(item => item.bundleId)}
            />
          </div>
        )}
        {activeTab === 'custom' && (
          <BuildYourOwnGrid
            services={displayedServices}
            categories={SERVICE_CATEGORIES}
            selectedCategory={selectedServiceCategory}
            onSelectCategory={setSelectedServiceCategory}
          />
        )}
      </div>

      {/* Comparison Panel */}
      <BundleComparisonPanel
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)} />


      {/* Cart Notification */}
      {cartNotification &&
      <div className={`fixed bottom-6 right-6 z-140 px-6 py-4 rounded-lg shadow-cinematic-lg flex items-center gap-3 animate-slide-up ${
        cartNotification.type === 'success'
          ? 'bg-success text-success-foreground'
          : 'bg-error text-error-foreground'
      }`}>
          <Icon 
            name={cartNotification.type === 'success' ? "CheckCircleIcon" : "ExclamationCircleIcon"} 
            size={24} 
            variant="solid" 
          />
          <span className="font-medium">{cartNotification.message}</span>
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