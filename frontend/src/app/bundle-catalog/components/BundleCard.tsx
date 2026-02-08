'use client';

import { useState } from 'react';
import { WAITLIST_MODE } from "@/lib/flag";
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export interface Bundle {
  id: string;
  name: string;
  description: string;
  bundlePrice: number;
  totalPlatformsPrice: number;
  savings: number;
  platforms: Platform[];
  features: string[];
  reviewCount: number;
  category: string;
  popular?: boolean;
}

interface Platform {
  name: string;
  logo: string | null;
  logoAlt: string | null;
}

interface BundleCardProps {
  bundle: Bundle;
  onAddToCart: (bundle: Bundle) => void;
  onToggleWishlist: (bundleId: string) => void;
  onToggleCompare: (bundleId: string) => void;
  isInWishlist: boolean;
  isInComparison: boolean;
  isInCart: boolean;
}

const BundleCard = ({
  bundle,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInComparison,
  isInCart,
}: BundleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

const savingsPercentage =
  bundle.totalPlatformsPrice > 0 ? Math.round((bundle.savings / bundle.totalPlatformsPrice) * 100) : 0;

  return (
    <div className="relative bg-card rounded-lg overflow-hidden shadow-cinematic hover:shadow-cinematic-lg transition-smooth group">
      {/* Content Section */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded font-medium">
            {bundle.category}
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
          {isInCart && (
            <span className="px-3 py-1 bg-success text-success-foreground text-xs font-bold rounded-full shadow-depth flex items-center gap-1">
              <Icon name="CheckCircleIcon" size={14} variant="solid" />
              In Cart
            </span>
          )}
          {!isInCart && savingsPercentage > 0 ? (
            <span className="px-3 py-1 bg-success text-success-foreground text-xs font-bold rounded-full shadow-depth">
              SAVE {savingsPercentage}%
            </span>
          ) : !isInCart && bundle.popular ? (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-depth">
              POPULAR
            </span>
          ) : null}
        </div>

        {/* Bundle Name */}
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-1">
          {bundle.name}
        </h3>

        {/* Platform Logos */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {bundle.platforms.slice(0, 3).map((platform) => (
            <div key={platform.name} className="flex flex-col items-center gap-1" title={platform.name}>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/40">
                {platform.logo ? (
                  <AppImage
                    src={platform.logo}
                    alt={platform.logoAlt ?? platform.name}
                    className="w-11 h-11 object-contain"
                  />
                ) : (
                  <span className="text-[10px] text-text-secondary px-1 text-center">
                    {platform.name}
                  </span>
                )}
              </div>

              {/* small label */}
              <span className="text-xs font-medium text-text-secondary max-w-[64px] truncate">
                {platform.name}
              </span>
            </div>
          ))}
          {bundle.platforms.length > 4 && (
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
              +{bundle.platforms.length - 3}
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-data font-bold text-primary">
              ${(bundle.bundlePrice ?? 0).toFixed(2)}
            </span>
            <span className="text-text-secondary">/month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary line-through">
              ${(bundle.totalPlatformsPrice ?? 0).toFixed(2)}
            </span>
            <span className="text-sm text-success font-medium">
              ${(bundle.savings ?? 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Expandable Features */}
        {isExpanded && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <h4 className="text-sm font-semibold text-text-primary mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {bundle.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-success mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (WAITLIST_MODE) return;
              onAddToCart(bundle);
            }}
            className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md flex items-center justify-center gap-2 transition-smooth"
          >
            <Icon
              name={WAITLIST_MODE ? 'LockClosedIcon' : 'ShoppingCartIcon'}
              size={18}
              variant="outline"
            />
            <span>{WAITLIST_MODE ? 'Join Waitlist' : 'Add to Cart'}</span>
          </button>

          <Link
            href={`/bundle-details?id=${bundle.id}`}
            className="py-2.5 px-4 bg-muted text-text-primary font-medium rounded-md hover:bg-muted/80 transition-smooth flex items-center justify-center"
          >
            <Icon name="ArrowRightIcon" size={18} variant="outline" />
          </Link>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 py-2 text-sm text-primary hover:text-primary/80 transition-smooth flex items-center justify-center gap-1"
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <Icon
            name="ChevronDownIcon"
            size={16}
            variant="outline"
            className={`transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default BundleCard;