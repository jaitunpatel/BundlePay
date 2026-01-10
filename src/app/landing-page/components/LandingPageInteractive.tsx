'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import FeaturedBundlesCarousel from './FeaturedBundlesCarousel';
import BenefitsSection from './BenefitsSection';
import BundleCategoriesGrid from './BundleCategoriesGrid';
import TrustSignalsSection from './TrustSignalsSection';
import Footer from './Footer';
import BundleComparisonPanel from '@/components/common/BundleComparisonPanel';

const LandingPageInteractive = () => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedBundlesCarousel />
      <BenefitsSection />
      <BundleCategoriesGrid />
      <TrustSignalsSection />
      <Footer />
      <BundleComparisonPanel 
        isOpen={isComparisonOpen} 
        onClose={() => setIsComparisonOpen(false)} 
      />
    </div>
  );
};

export default LandingPageInteractive;