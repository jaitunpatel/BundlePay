'use client';

import { useState } from 'react';
import BundleHero from './BundleHero';
import PlatformShowcase from './PlatformShowcase';
import BundleContent from './BundleContent';
import PricingBreakdown from './PricingBreakdown';
import ReviewSection from './ReviewSection';
import RelatedBundles from './RelatedBundles';
import PromotionalOffer from './PromotionalOffer';
import ContentPreview from './ContentPreview';
import TechnicalRequirements from './TechnicalRequirements';
import SocialShare from './SocialShare';
import BundleComparisonPanel from '@/components/common/BundleComparisonPanel';

interface BundleData {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  savings: number;
  platforms: string[];
  platformDetails: Array<{
    name: string;
    logo: string;
    logoAlt: string;
    individualPrice: number;
    description: string;
    keyContent: string[];
  }>;
  overview: string;
  features: string[];
  contentItems: Array<{
    id: string;
    title: string;
    platform: string;
    thumbnail: string;
    thumbnailAlt: string;
    type: 'movie' | 'series' | 'sports' | 'documentary';
  }>;
  reviews: Array<{
    id: string;
    userName: string;
    userAvatar: string;
    userAvatarAlt: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
    helpful: number;
  }>;
  averageRating: number;
  totalReviews: number;
  technicalRequirements: Array<{
    category: string;
    items: string[];
  }>;
  relatedBundles: Array<{
    id: string;
    name: string;
    price: number;
    platforms: string[];
    savings: number;
  }>;
  promotion: {
    title: string;
    description: string;
    discount: number;
    expiresAt: string;
    code: string;
  };
}

interface BundleDetailsInteractiveProps {
  bundleData: BundleData;
}

const BundleDetailsInteractive = ({ bundleData }: BundleDetailsInteractiveProps) => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const handleAddToCart = () => {
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const handleCompare = () => {
    setIsComparisonOpen(true);
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'InformationCircleIcon',
      content: (
        <div className="space-y-4">
          <p className="text-text-primary leading-relaxed">{bundleData.overview}</p>
          <div className="bg-muted rounded-lg p-5">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              {bundleData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'content',
      label: 'Content Highlights',
      icon: 'PlayIcon',
      content: <ContentPreview items={bundleData.contentItems} />,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'StarIcon',
      content: (
        <ReviewSection
          reviews={bundleData.reviews}
          averageRating={bundleData.averageRating}
          totalReviews={bundleData.totalReviews}
        />
      ),
    },
    {
      id: 'requirements',
      label: 'Requirements',
      icon: 'ComputerDesktopIcon',
      content: <TechnicalRequirements requirements={bundleData.technicalRequirements} />,
    },
  ];

  return (
    <>
      {showAddedNotification && (
        <div className="fixed top-20 right-4 z-100 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-cinematic-lg animate-slide-in-right">
          <div className="flex items-center gap-2">
            <span className="font-medium">Bundle added to cart!</span>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-6">
          <BundleHero
            bundleName={bundleData.name}
            price={bundleData.price}
            originalPrice={bundleData.originalPrice}
            savings={bundleData.savings}
            platforms={bundleData.platforms}
            onAddToCart={handleAddToCart}
            onCompare={handleCompare}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PlatformShowcase platforms={bundleData.platformDetails} />
              <BundleContent tabs={tabs} />
              <PricingBreakdown
                items={bundleData.platformDetails.map((p) => ({
                  platform: p.name,
                  individualPrice: p.individualPrice,
                }))}
                bundlePrice={bundleData.price}
                totalSavings={bundleData.savings}
              />
            </div>

            <div className="space-y-6">
              <PromotionalOffer
                title={bundleData.promotion.title}
                description={bundleData.promotion.description}
                discount={bundleData.promotion.discount}
                expiresAt={bundleData.promotion.expiresAt}
                code={bundleData.promotion.code}
              />
              <RelatedBundles bundles={bundleData.relatedBundles} />
              <SocialShare
                bundleName={bundleData.name}
                bundleUrl={`https://streambundle.com/bundle-details?id=${bundleData.id}`}
              />
            </div>
          </div>
        </div>
      </div>

      <BundleComparisonPanel
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </>
  );
};

export default BundleDetailsInteractive;