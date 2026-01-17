import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BundleDetailsInteractive from './components/BundleDetailsInteractive';

export const metadata: Metadata = {
  title: 'Bundle Details - StreamBundle',
  description: 'View comprehensive information about streaming platform bundles including pricing, included platforms, content highlights, user reviews, and technical requirements to make informed subscription decisions.'
};

export default function BundleDetailsPage() {
  const bundleData = {
    id: 'ent-plus-001',
    name: 'Entertainment Plus Bundle',
    price: 29.99,
    originalPrice: 44.97,
    savings: 14.98,
    platforms: ['Netflix', 'Disney+', 'Hulu'],
    platformDetails: [
    {
      name: 'Netflix',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png",
      logoAlt: 'Netflix logo with red N letter on black background',
      individualPrice: 15.99,
      description: 'Stream award-winning series, movies, documentaries, and more',
      keyContent: ['Stranger Things', 'The Crown', 'Squid Game', 'Wednesday']
    },
    {
      name: 'Disney+',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1829e958d-1764662431997.png",
      logoAlt: 'Disney Plus logo with blue streaming icon',
      individualPrice: 13.99,
      description: 'Disney, Pixar, Marvel, Star Wars, and National Geographic',
      keyContent: ['The Mandalorian', 'Loki', 'Encanto', 'Avatar: The Way of Water']
    },
    {
      name: 'Hulu',
      logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471",
      logoAlt: 'Hulu logo with green text on white background',
      individualPrice: 14.99,
      description: 'Current season TV shows, classic series, and Hulu Originals',
      keyContent: ['The Handmaid\'s Tale', 'Only Murders in the Building', 'The Bear']
    }],

    overview: 'The Entertainment Plus Bundle combines three of the most popular streaming platforms into one affordable package. Get unlimited access to thousands of movies, TV shows, documentaries, and exclusive originals from Netflix, Disney+, and Hulu. Perfect for families and entertainment enthusiasts who want the best content from multiple platforms without breaking the bank. Enjoy 4K streaming, ad-free viewing, and the ability to download content for offline watching across all included platforms.',
    features: [
    'Unlimited streaming on all three platforms with a single subscription',
    '4K Ultra HD and HDR quality available on supported content',
    'Ad-free viewing experience across all platforms',
    'Download content for offline viewing on mobile devices',
    'Multiple user profiles with personalized recommendations',
    'Stream on up to 4 devices simultaneously',
    'Access to exclusive originals and premieres',
    'Parental controls and kids profiles included',
    'Cancel anytime with no long-term commitment',
    'New content added weekly across all platforms'],

    contentItems: [
    {
      id: 'c1',
      title: 'Stranger Things',
      platform: 'Netflix',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f833a1d0-1766897835010.png",
      thumbnailAlt: 'Dark atmospheric poster showing group of teenagers with flashlights in mysterious forest setting',
      type: 'series' as const
    },
    {
      id: 'c2',
      title: 'The Mandalorian',
      platform: 'Disney+',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_13b5e4030-1767556603332.png",
      thumbnailAlt: 'Armored space warrior in silver helmet standing in desert landscape with spacecraft',
      type: 'series' as const
    },
    {
      id: 'c3',
      title: 'The Bear',
      platform: 'Hulu',
      thumbnail: "https://images.unsplash.com/photo-1627396301302-0c087a5799c9",
      thumbnailAlt: 'Professional chef in white uniform working in busy restaurant kitchen with stainless steel equipment',
      type: 'series' as const
    },
    {
      id: 'c4',
      title: 'Avatar: The Way of Water',
      platform: 'Disney+',
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14cc87382-1767619827504.png",
      thumbnailAlt: 'Underwater scene with blue bioluminescent creatures swimming in crystal clear ocean water',
      type: 'movie' as const
    },
    {
      id: 'c5',
      title: 'Our Planet',
      platform: 'Netflix',
      thumbnail: "https://images.unsplash.com/photo-1599978485519-1173ad78e450",
      thumbnailAlt: 'Aerial view of lush green forest with mountains and lake in background during golden hour',
      type: 'documentary' as const
    },
    {
      id: 'c6',
      title: 'Encanto',
      platform: 'Disney+',
      thumbnail: "https://images.unsplash.com/photo-1671638983555-7e53bff54179",
      thumbnailAlt: 'Colorful Colombian village with magical glowing house surrounded by tropical flowers and butterflies',
      type: 'movie' as const
    },
    {
      id: 'c7',
      title: 'Formula 1: Drive to Survive',
      platform: 'Netflix',
      thumbnail: "https://images.unsplash.com/photo-1674582570761-3298fd33b2f4",
      thumbnailAlt: 'Red Formula 1 race car speeding on track with motion blur and dramatic lighting',
      type: 'sports' as const
    },
    {
      id: 'c8',
      title: 'Only Murders in the Building',
      platform: 'Hulu',
      thumbnail: "https://images.unsplash.com/photo-1701522526283-9ab02c46675b",
      thumbnailAlt: 'Vintage New York apartment building exterior with ornate architecture and fire escapes at dusk',
      type: 'series' as const
    }],

    reviews: [
    {
      id: 'r1',
      userName: 'Sarah Mitchell',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_184c1f00c-1763293971167.png",
      userAvatarAlt: 'Professional woman with long brown hair smiling at camera in business casual attire',
      rating: 5,
      date: 'January 5, 2026',
      comment: 'This bundle is absolutely worth it! We were paying separately for all three services and this saves us almost $15 per month. The content selection is incredible and there\'s always something new to watch. Highly recommend for families!',
      verified: true,
      helpful: 24
    },
    {
      id: 'r2',
      userName: 'Michael Chen',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1deaf0e87-1763296711015.png",
      userAvatarAlt: 'Asian man with short black hair wearing casual blue shirt smiling outdoors',
      rating: 4,
      date: 'January 3, 2026',
      comment: 'Great value for money. The only minor issue is that sometimes the streaming quality varies depending on the platform, but overall very satisfied with the content variety and savings.',
      verified: true,
      helpful: 18
    },
    {
      id: 'r3',
      userName: 'Emily Rodriguez',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
      userAvatarAlt: 'Hispanic woman with curly dark hair in red top smiling warmly at camera',
      rating: 5,
      date: 'December 28, 2025',
      comment: 'Best decision we made for our entertainment needs! The kids love Disney+, my husband watches sports on Hulu, and I binge Netflix shows. Everyone in the family is happy and we\'re saving money. Win-win!',
      verified: true,
      helpful: 31
    },
    {
      id: 'r4',
      userName: 'David Thompson',
      userAvatar: "https://images.unsplash.com/photo-1651115625299-d177fa44453d",
      userAvatarAlt: 'Caucasian man with beard wearing plaid shirt smiling in outdoor setting',
      rating: 4,
      date: 'December 25, 2025',
      comment: 'Solid bundle with good savings. Setup was easy and customer support was helpful when I had questions about device limits. Would be 5 stars if they included more international content.',
      verified: false,
      helpful: 12
    }],

    averageRating: 4.5,
    totalReviews: 247,
    technicalRequirements: [
    {
      category: 'Supported Devices',
      items: [
      'Smart TVs (Samsung, LG, Sony, Vizio)',
      'Streaming devices (Roku, Fire TV, Apple TV, Chromecast)',
      'Gaming consoles (PlayStation 4/5, Xbox One/Series X)',
      'Mobile devices (iOS 14+, Android 8.0+)',
      'Web browsers (Chrome, Firefox, Safari, Edge)',
      'Tablets (iPad, Android tablets)']

    },
    {
      category: 'Internet Requirements',
      items: [
      'Minimum 5 Mbps for HD streaming',
      'Recommended 25 Mbps for 4K Ultra HD',
      'Stable broadband connection required',
      'Wi-Fi or wired ethernet connection']

    },
    {
      category: 'Account Features',
      items: [
      'Up to 5 user profiles per platform',
      'Simultaneous streaming on 4 devices',
      'Download content on up to 10 devices',
      'Parental controls and content ratings',
      'Personalized recommendations']

    }],

    relatedBundles: [
    {
      id: 'sports-001',
      name: 'Sports Fanatic Package',
      price: 39.99,
      platforms: ['ESPN+', 'DAZN', 'NBA League Pass'],
      savings: 20.0
    },
    {
      id: 'premium-001',
      name: 'Premium Entertainment Suite',
      price: 49.99,
      platforms: ['Netflix', 'HBO Max', 'Paramount+', 'Apple TV+'],
      savings: 25.0
    },
    {
      id: 'family-001',
      name: 'Family Fun Bundle',
      price: 34.99,
      platforms: ['Disney+', 'Nickelodeon+', 'PBS Kids'],
      savings: 18.0
    }],

    promotion: {
      title: 'New Year Special',
      description: 'Get 20% off your first 3 months',
      discount: 20,
      expiresAt: '2026-01-31T23:59:59',
      code: 'NEWYEAR2026'
    }
  };

  return (
    <>
      <Header />
      <BundleDetailsInteractive bundleData={bundleData} />
    </>);

}