'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BundleHeroProps {
  bundleName: string;
  price: number;
  originalPrice: number;
  savings: number;
  platforms: string[];
  onAddToCart: () => void;
  onCompare: () => void;
}

const BundleHero = ({
  bundleName,
  price,
  originalPrice,
  savings,
  platforms,
  onAddToCart,
  onCompare,
}: BundleHeroProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    onAddToCart();
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 via-secondary/10 to-background rounded-lg p-6 lg:p-8 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-3">
            {bundleName}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {platforms.map((platform, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-card text-text-primary text-sm font-medium rounded-md"
              >
                {platform}
              </span>
            ))}
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl lg:text-5xl font-data font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            <span className="text-text-secondary">/month</span>
            <span className="text-lg text-text-secondary line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-success">
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span className="font-medium">Save ${savings.toFixed(2)}/month</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth disabled:opacity-50"
          >
            <Icon
              name={isAddingToCart ? 'CheckIcon' : 'ShoppingCartIcon'}
              size={20}
              variant="outline"
            />
            <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
          </button>
          <button
            onClick={onCompare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-card text-text-primary font-medium rounded-md hover:bg-muted transition-smooth border border-border"
          >
            <Icon name="ArrowsRightLeftIcon" size={20} variant="outline" />
            <span>Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BundleHero;