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

type LandingPageInteractiveProps = {
  waitlistMode: boolean;
};

const LandingPageInteractive = ({ waitlistMode }: LandingPageInteractiveProps) => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {waitlistMode && (
        <div className="mx-auto mt-4 w-fit rounded-full bg-yellow-500/20 px-4 py-1 text-xs font-semibold text-yellow-300">
          WAITLIST MODE ON
        </div>
      )}
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