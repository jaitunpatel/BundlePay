'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationError } from '@/lib/cartApi';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  platforms: Array<{
    name: string;
    logo: string;
    alt: string;
  }>;
  features: string[];
  badge?: string;
  image: string;
  imageAlt: string;
}

const FeaturedBundlesCarousel = () => {
  const router = useRouter();
  const { userEmail } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; bundleId: string } | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const bundles: Bundle[] = [
  {
    id: '1',
    name: 'Entertainment Plus Bundle',
    description: 'Perfect for movie lovers and binge-watchers. Get unlimited access to premium content.',
    price: 29.99,
    originalPrice: 44.99,
    savings: 15.00,
    platforms: [
    {
      name: 'Netflix',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecfe12c3-1766878186896.png",
      alt: 'Netflix logo on red background with streaming interface'
    },
    {
      name: 'Disney+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png",
      alt: 'Disney Plus logo with iconic blue star and white text'
    },
    {
      name: 'Hulu',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc2cca90-1765205567661.png",
      alt: 'Hulu streaming service logo in bright green'
    }],

    features: ['4K Ultra HD', 'Ad-Free Experience', 'Download Content', 'Family Sharing'],
    badge: 'Most Popular',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4fb2951-1765116205249.png",
    imageAlt: 'Family watching streaming content together on large TV screen in cozy living room'
  },
  {
    id: '2',
    name: 'Sports Fanatic Package',
    description: 'Never miss a game with comprehensive sports coverage from top networks.',
    price: 39.99,
    originalPrice: 59.99,
    savings: 20.00,
    platforms: [
    {
      name: 'ESPN+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png",
      alt: 'ESPN Plus sports streaming logo with red and black branding'
    },
    {
      name: 'DAZN',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c6e75622-1767044516985.png",
      alt: 'DAZN sports streaming platform logo on yellow background'
    },
    {
      name: 'NBA League Pass',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1406e55a6-1767992351801.png",
      alt: 'NBA League Pass logo with basketball and orange branding'
    }],

    features: ['Live Sports', 'Game Replays', 'Multi-Device Streaming', 'Exclusive Content'],
    badge: 'Best Value',
    image: "https://images.unsplash.com/photo-1710806587787-0372461a18d1",
    imageAlt: 'Basketball game action shot with players on court and crowd in background'
  },
  {
    id: '3',
    name: 'Family Entertainment Hub',
    description: 'Kid-friendly content combined with adult entertainment for the whole family.',
    price: 34.99,
    originalPrice: 49.99,
    savings: 15.00,
    platforms: [
    {
      name: 'Disney+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png",
      alt: 'Disney Plus streaming logo with magical blue gradient'
    },
    {
      name: 'Paramount+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10af99f59-1767901560401.png",
      alt: 'Paramount Plus logo with mountain peak and blue sky'
    },
    {
      name: 'Apple TV+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13f06e55a-1766511529578.png",
      alt: 'Apple TV Plus logo with white apple icon on black background'
    }],

    features: ['Parental Controls', 'Kids Profiles', 'Educational Content', 'Offline Viewing'],
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd5e3e25-1764671590828.png",
    imageAlt: 'Happy family with children watching animated movie together on tablet device'
  },
  {
    id: '4',
    name: 'Premium Cinema Collection',
    description: 'Access to latest blockbusters and exclusive premieres from top studios.',
    price: 44.99,
    originalPrice: 64.99,
    savings: 20.00,
    platforms: [
    {
      name: 'HBO Max',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1eef3bb6f-1767335862342.png",
      alt: 'HBO Max logo with purple gradient and white text'
    },
    {
      name: 'Amazon Prime',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_112fbd955-1765343832518.png",
      alt: 'Amazon Prime Video logo with teal smile arrow'
    },
    {
      name: 'Peacock',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11c9a28e1-1765288251845.png",
      alt: 'Peacock streaming logo with colorful feather design'
    }],

    features: ['Same-Day Releases', 'Premium Originals', '4K HDR', 'Dolby Atmos'],
    badge: 'Premium',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb6b6c29-1767734220472.png",
    imageAlt: 'Modern home theater setup with large screen showing cinematic content'
  }];


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bundles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bundles.length) % bundles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = async (bundleId: string, bundleName: string) => {
    // Check if user is authenticated
    if (!userEmail) {
      router.push(`/sign-in?from=/`);
      return;
    }

    setAddingToCartId(bundleId);
    try {
      await addToCart(bundleId);
      setNotification({
        message: `${bundleName} added to cart!`,
        type: 'success',
        bundleId,
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      let errorMessage = 'Failed to add to cart';
      
      if (error instanceof AuthenticationError) {
        // Redirect to sign-in if authentication fails
        router.push(`/sign-in?from=/`);
        return;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setNotification({
        message: errorMessage,
        type: 'error',
        bundleId,
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setAddingToCartId(null);
    }
  };

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated, currentSlide]);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Featured Bundle Packages
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Handpicked combinations designed to maximize your entertainment value
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: isHydrated ? `translateX(-${currentSlide * 100}%)` : 'translateX(0)' }}>

              {bundles.map((bundle) =>
              <div key={bundle.id} className="w-full flex-shrink-0">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-cinematic-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <AppImage
                        src={bundle.image}
                        alt={bundle.imageAlt}
                        className="w-full h-full object-cover" />

                        {bundle.badge &&
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium shadow-cinematic">
                            {bundle.badge}
                          </div>
                      }
                      </div>

                      <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-3">
                            {bundle.name}
                          </h3>
                          <p className="text-text-secondary mb-6">
                            {bundle.description}
                          </p>

                          <div className="flex items-center gap-3 mb-6">
                            {bundle.platforms.map((platform) =>
                          <div key={platform.name} className="w-16 h-10 relative overflow-hidden rounded bg-muted">
                                <AppImage
                              src={platform.logo}
                              alt={platform.alt}
                              className="w-full h-full object-cover" />

                              </div>
                          )}
                            {bundle.platforms.length > 3 &&
                          <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                                <span className="text-xs font-medium text-text-secondary">+{bundle.platforms.length - 3}</span>
                              </div>
                          }
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {bundle.features.map((feature, idx) =>
                          <div key={idx} className="flex items-center gap-2">
                                <Icon name="CheckCircleIcon" size={18} variant="solid" className="text-success flex-shrink-0" />
                                <span className="text-sm text-text-primary">{feature}</span>
                              </div>
                          )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-4xl font-data font-bold text-primary">
                              ${bundle.price.toFixed(2)}
                            </span>
                            <span className="text-xl text-text-secondary line-through">
                              ${bundle.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-text-secondary">/month</span>
                          </div>

                          <div className="flex items-center gap-2 mb-6 text-success">
                            <Icon name="SparklesIcon" size={20} variant="solid" />
                            <span className="font-medium">Save ${bundle.savings.toFixed(2)}/month</span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                            href={`/bundle-details?id=${bundle.id}`}
                            className="flex-1 py-3 px-6 bg-primary text-primary-foreground text-center font-medium rounded-md hover:shadow-glow-primary transition-smooth">

                              View Details
                            </Link>
                            <button 
                              onClick={() => handleAddToCart(bundle.id, bundle.name)}
                              disabled={addingToCartId === bundle.id || cartItems.some(item => item.bundleId === bundle.id)}
                              className={`flex-1 py-3 px-6 text-center font-medium rounded-md transition-smooth flex items-center justify-center gap-2 ${
                                cartItems.some(item => item.bundleId === bundle.id)
                                  ? 'bg-success text-success-foreground cursor-default'
                                  : 'bg-muted text-text-primary hover:bg-input'
                              }`}>
                              <Icon
                                name={cartItems.some(item => item.bundleId === bundle.id) ? "CheckIcon" : "ShoppingCartIcon"}
                                size={18}
                                variant="outline"
                              />
                              <span>{cartItems.some(item => item.bundleId === bundle.id) ? 'Added to Cart' : addingToCartId === bundle.id ? 'Adding...' : 'Add to Cart'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card text-text-primary rounded-full shadow-cinematic hover:bg-muted transition-smooth flex items-center justify-center z-10"
            aria-label="Previous bundle">

            <Icon name="ChevronLeftIcon" size={24} variant="outline" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card text-text-primary rounded-full shadow-cinematic hover:bg-muted transition-smooth flex items-center justify-center z-10"
            aria-label="Next bundle">

            <Icon name="ChevronRightIcon" size={24} variant="outline" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {bundles.map((_, index) =>
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
              currentSlide === index ? 'bg-primary w-8' : 'bg-muted hover:bg-input'}`
              }
              aria-label={`Go to slide ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default FeaturedBundlesCarousel;