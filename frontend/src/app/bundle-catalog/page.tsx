import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BundleCatalogInteractive from './components/BundleCatalogInteractive';

export const metadata: Metadata = {
  title: 'Bundle Catalog - StreamBundle',
  description:
    'Discover and compare OTT platform bundles with comprehensive filtering and search capabilities. Find the perfect streaming bundle for your entertainment needs.',
};

type Bundle = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
};

export default async function BundleCatalogPage() {
  const res = await fetch('http://localhost:5192/api/bundles', { cache: 'no-store' });

  // if backend is down or error, show empty list (no crash)
  const initialBundles: Bundle[] = res.ok ? await res.json() : [];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BundleCatalogInteractive apiBundles={initialBundles} />
    </main>
  );
}
