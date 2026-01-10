'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  platforms: Platform[];
  features: string[];
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  imageAlt: string;
  popular?: boolean;
}

interface Platform {
  name: string;
  logo: string;
  logoAlt: string;
}

interface BundleCardProps {
  bundle: Bundle;
  onAddToCart: (bundleId: string) => void;
  onToggleWishlist: (bundleId: string) => void;
  onToggleCompare: (bundleId: string) => void;
  isInWishlist: boolean;
  isInComparison: boolean;
}

const BundleCard = ({
  bundle,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInComparison,
}: BundleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const savingsPercentage = Math.round((bundle.savings / bundle.originalPrice) * 100);

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-cinematic hover:shadow-cinematic-lg transition-smooth group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={bundle.image}
          alt={bundle.imageAlt}
          className={`w-full h-full object-cover transition-smooth group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="PhotoIcon" size={48} variant="outline" className="text-muted-foreground animate-pulse" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {bundle.popular && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-depth">
              POPULAR
            </span>
          )}
          {savingsPercentage > 0 && (
            <span className="px-3 py-1 bg-success text-success-foreground text-xs font-bold rounded-full shadow-depth">
              SAVE {savingsPercentage}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => onToggleWishlist(bundle.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth ${
              isInWishlist
                ? 'bg-error text-error-foreground'
                : 'bg-background/80 text-text-secondary hover:text-error'
            }`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon name="HeartIcon" size={20} variant={isInWishlist ? 'solid' : 'outline'} />
          </button>
          <button
            onClick={() => onToggleCompare(bundle.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-smooth ${
              isInComparison
                ? 'bg-primary text-primary-foreground'
                : 'bg-background/80 text-text-secondary hover:text-primary'
            }`}
            aria-label={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Icon name="ScaleIcon" size={20} variant={isInComparison ? 'solid' : 'outline'} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded font-medium">
            {bundle.category}
          </span>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={16} variant="solid" className="text-accent" />
            <span className="text-sm font-data font-medium text-text-primary">{bundle.rating}</span>
            <span className="text-xs text-text-secondary">({bundle.reviewCount})</span>
          </div>
        </div>

        {/* Bundle Name */}
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-1">
          {bundle.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {bundle.description}
        </p>

        {/* Platform Logos */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {bundle.platforms.slice(0, 4).map((platform, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden"
              title={platform.name}
            >
              <AppImage
                src={platform.logo}
                alt={platform.logoAlt}
                className="w-8 h-8 object-contain"
              />
            </div>
          ))}
          {bundle.platforms.length > 4 && (
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
              +{bundle.platforms.length - 4}
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-data font-bold text-primary">
              ${bundle.price.toFixed(2)}
            </span>
            <span className="text-text-secondary">/month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary line-through">
              ${bundle.originalPrice.toFixed(2)}
            </span>
            <span className="text-sm text-success font-medium">
              Save ${bundle.savings.toFixed(2)}/mo
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
            onClick={() => onAddToCart(bundle.id)}
            className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth flex items-center justify-center gap-2"
          >
            <Icon name="ShoppingCartIcon" size={18} variant="outline" />
            <span>Add to Cart</span>
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