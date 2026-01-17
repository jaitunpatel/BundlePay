'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface Platform {
  name: string;
  logo: string;
  alt: string;
}

const HeroSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const platforms: Platform[] = [
  {
    name: 'Netflix',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecfe12c3-1766878186896.png",
    alt: 'Netflix logo in red and black on streaming device screen'
  },
  {
    name: 'Disney+',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png",
    alt: 'Disney Plus logo with blue gradient and white star icon'
  },
  {
    name: 'Amazon Prime',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf33cb5e-1766564794040.png",
    alt: 'Amazon Prime Video logo with teal and white branding'
  },
  {
    name: 'Hulu',
    logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471",
    alt: 'Hulu logo in bright green on dark background'
  },
  {
    name: 'HBO Max',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1eef3bb6f-1767335862342.png",
    alt: 'HBO Max logo with purple gradient and white text'
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHydrated, platforms.length]);

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-background py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6">
              All Your Favorite Streaming Platforms in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                One Bundle
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              Save up to 40% by bundling Netflix, Disney+, Hulu, and more. One subscription, unlimited entertainment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/bundle-catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth text-lg">

                <Icon name="RectangleStackIcon" size={24} variant="outline" />
                <span>Explore Bundles</span>
              </Link>
              <Link
                href="/bundle-catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted text-text-primary font-medium rounded-md hover:bg-input transition-smooth text-lg">

                <Icon name="CalculatorIcon" size={24} variant="outline" />
                <span>Calculate Savings</span>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-data font-bold text-primary">
                  {isHydrated ? '50K+' : '50K+'}
                </div>
                <div className="text-sm text-text-secondary mt-1">Active Users</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-data font-bold text-primary">
                  {isHydrated ? '40%' : '40%'}
                </div>
                <div className="text-sm text-text-secondary mt-1">Avg. Savings</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-data font-bold text-primary">
                  {isHydrated ? '15+' : '15+'}
                </div>
                <div className="text-sm text-text-secondary mt-1">Platforms</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-muted rounded-2xl p-8 shadow-cinematic-lg">
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium shadow-cinematic">
                Save up to $25/mo
              </div>

              <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Featured Platforms
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {platforms.slice(0, 4).map((platform, index) =>
                <div
                  key={platform.name}
                  className={`bg-background rounded-lg p-4 transition-smooth ${
                  isHydrated && currentPlatformIndex === index ?
                  'ring-2 ring-primary shadow-glow-primary' :
                  ''}`
                  }>

                    <div className="aspect-video relative overflow-hidden rounded-md mb-2">
                      <AppImage
                      src={platform.logo}
                      alt={platform.alt}
                      className="w-full h-full object-cover" />

                    </div>
                    <p className="text-sm font-medium text-text-primary text-center">
                      {platform.name}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-text-secondary">
                <Icon name="PlusIcon" size={20} variant="outline" />
                <span className="text-sm font-medium">11 more platforms available</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-cinematic font-medium hidden lg:flex items-center gap-2">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;