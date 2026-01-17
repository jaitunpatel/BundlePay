import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BundleCatalogInteractive from './components/BundleCatalogInteractive';

export const metadata: Metadata = {
  title: 'Bundle Catalog - StreamBundle',
  description: 'Discover and compare OTT platform bundles with comprehensive filtering and search capabilities. Find the perfect streaming bundle for your entertainment needs.',
};

export default function BundleCatalogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BundleCatalogInteractive />
    </main>
  );
}