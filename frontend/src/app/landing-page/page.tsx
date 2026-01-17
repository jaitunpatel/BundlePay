import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata: Metadata = {
  title: 'StreamBundle - Bundle Your Favorite Streaming Platforms & Save Up to 40%',
  description: 'Discover and subscribe to bundled packages of Netflix, Disney+, Hulu, HBO Max, and more streaming platforms. Save up to 40% with our curated entertainment bundles. One subscription, unlimited entertainment.',
};

export default function LandingPage() {
  return <LandingPageInteractive />;
}