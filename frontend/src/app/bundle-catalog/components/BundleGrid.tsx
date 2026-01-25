'use client';

import { useState, useEffect } from 'react';
import BundleCard, { Bundle } from './BundleCard';
import Icon from '@/components/ui/AppIcon';

interface BundleGridProps {
  bundles: Bundle[];
  onAddToCart: (bundleId: string) => void;
  onToggleWishlist: (bundleId: string) => void;
  onToggleCompare: (bundleId: string) => void;
  wishlistIds: string[];
  comparisonIds: string[];
}

const BundleGrid = ({
  bundles,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  wishlistIds,
  comparisonIds,
}: BundleGridProps) => {
  const [displayedBundles, setDisplayedBundles] = useState<Bundle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    setDisplayedBundles(bundles.slice(0, itemsPerPage));
    setHasMore(bundles.length > itemsPerPage);
  }, [bundles]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedBundles((prev) => {
        const currentLength = prev.length;
        const nextBundles = bundles.slice(currentLength, currentLength + itemsPerPage);
        setHasMore(currentLength + nextBundles.length < bundles.length);
        return [...prev, ...nextBundles];
      });
      setIsLoading(false);
    }, 800);
  };

  if (bundles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Icon name="FunnelIcon" size={64} variant="outline" className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          No bundles found
        </h3>
        <p className="text-text-secondary text-center max-w-md">
          Try adjusting your filters or search criteria to find the perfect bundle for you.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {displayedBundles.map(bundle => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onToggleCompare={onToggleCompare}
            isInWishlist={wishlistIds.includes(bundle.id)}
            isInComparison={comparisonIds.includes(bundle.id)}
          />
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card rounded-lg overflow-hidden shadow-cinematic animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-muted rounded-md" />
                  <div className="w-10 h-10 bg-muted rounded-md" />
                  <div className="w-10 h-10 bg-muted rounded-md" />
                </div>
                <div className="h-8 bg-muted rounded w-1/2" />
                <div className="h-10 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth flex items-center gap-2"
          >
            <span>Load More Bundles</span>
            <Icon name="ArrowDownIcon" size={18} variant="outline" />
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && displayedBundles.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            You've reached the end of the results. Showing all {displayedBundles.length} bundles.
          </p>
        </div>
      )}
    </div>
  );
};

export default BundleGrid;