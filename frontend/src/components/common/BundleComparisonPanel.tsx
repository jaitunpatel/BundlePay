'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationError } from '@/lib/cartApi';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface ComparisonBundle {
  id: string;
  name: string;
  price: number;
  platforms: string[];
  features: string[];
  savings: number;
}

interface BundleComparisonPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const BundleComparisonPanel = ({ 
  isOpen = false, 
  onClose = () => {}, 
  className = '' 
}: BundleComparisonPanelProps) => {
  const router = useRouter();
  const { userEmail } = useAuth();
  const { addToCart } = useCart();
  const [comparisonBundles, setComparisonBundles] = useState<ComparisonBundle[]>([
    {
      id: '1',
      name: 'Entertainment Plus Bundle',
      price: 29.99,
      platforms: ['Netflix', 'Disney+', 'Hulu'],
      features: ['4K Streaming', 'Ad-Free', 'Download Content'],
      savings: 15.00,
    },
    {
      id: '2',
      name: 'Sports Fanatic Package',
      price: 39.99,
      platforms: ['ESPN+', 'DAZN', 'NBA League Pass'],
      features: ['Live Sports', 'Replays', 'Multi-Device'],
      savings: 20.00,
    },
  ]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const removeBundle = (id: string) => {
    setComparisonBundles(comparisonBundles.filter(bundle => bundle.id !== id));
    if (comparisonBundles.length <= 1) {
      onClose();
    }
  };

  const clearAll = () => {
    setComparisonBundles([]);
    onClose();
  };

  const handleAddAllToCart = async () => {
    // Check if user is authenticated
    if (!userEmail) {
      router.push(`/sign-in?from=/bundle-catalog`);
      return;
    }

    setIsAddingToCart(true);
    try {
      // Add all bundles to cart
      const results = await Promise.allSettled(
        comparisonBundles.map(bundle => addToCart(bundle.id))
      );
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      if (failed === 0) {
        setNotification({
          message: `${successful} bundle${successful > 1 ? 's' : ''} added to cart!`,
          type: 'success',
        });
      } else if (successful === 0) {
        setNotification({
          message: 'Failed to add bundles to cart',
          type: 'error',
        });
      } else {
        setNotification({
          message: `${successful} added, ${failed} failed`,
          type: 'error',
        });
      }
      
      setTimeout(() => {
        setNotification(null);
        onClose();
      }, 2000);
    } catch (error) {
      let errorMessage = 'Failed to add bundles to cart';
      
      if (error instanceof AuthenticationError) {
        // Redirect to sign-in if authentication fails
        router.push(`/sign-in?from=/bundle-catalog`);
        return;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      console.error('Error adding bundles to cart:', error);
      setNotification({
        message: errorMessage,
        type: 'error',
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!isOpen || comparisonBundles.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-background z-120"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`fixed inset-y-0 right-0 w-full lg:w-[800px] bg-card shadow-cinematic-xl z-130 overflow-hidden ${className}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-heading font-semibold text-text-primary">
                Compare Bundles
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {comparisonBundles.length} bundles selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                aria-label="Close comparison"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {comparisonBundles.map((bundle) => (
                <div key={bundle.id} className="bg-muted rounded-lg p-6 relative">
                  <button
                    onClick={() => removeBundle(bundle.id)}
                    className="absolute top-4 right-4 p-1 text-text-secondary hover:text-error hover:bg-background rounded transition-smooth"
                    aria-label="Remove from comparison"
                  >
                    <Icon name="XMarkIcon" size={20} variant="outline" />
                  </button>

                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-4 pr-8">
                    {bundle.name}
                  </h3>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-data font-bold text-primary">
                        ${bundle.price.toFixed(2)}
                      </span>
                      <span className="text-text-secondary">/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-success">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" />
                      <span className="text-sm font-medium">Save ${bundle.savings.toFixed(2)}/mo</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">Platforms Included</h4>
                    <div className="flex flex-wrap gap-2">
                      {bundle.platforms.map((platform, idx) => (
                        <span key={idx} className="px-3 py-1 bg-background text-text-primary text-sm rounded-md">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {bundle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-text-primary">
                          <Icon name="CheckIcon" size={16} variant="outline" className="text-success" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/bundle-details?id=${bundle.id}`}
                    className="block w-full py-3 px-4 bg-primary text-primary-foreground text-center font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-muted">
            {notification && (
              <div className={`mb-4 p-4 rounded-md flex items-center gap-2 ${
                notification.type === 'success'
                  ? 'bg-success/10 text-success-foreground'
                  : 'bg-error/10 text-error-foreground'
              }`}>
                <Icon 
                  name={notification.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} 
                  size={20} 
                  variant="solid" 
                />
                <span className="font-medium">{notification.message}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
              >
                Continue Browsing
              </button>
              <button
                onClick={handleAddAllToCart}
                disabled={isAddingToCart}
                className="flex-1 py-3 px-4 bg-primary text-primary-foreground text-center font-medium rounded-md hover:shadow-glow-primary transition-smooth disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding to Cart...' : 'Add All to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BundleComparisonPanel;