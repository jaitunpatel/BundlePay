import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BundleCatalogInteractive from './components/BundleCatalogInteractive';

export const metadata: Metadata = {
  title: 'Bundle Catalog - StreamBundle',
  description:
    'Discover and compare OTT platform bundles with comprehensive filtering and search capabilities. Find the perfect streaming bundle for your entertainment needs.',
};

type Platform = {
  name: string;
  logo: string | null;
  logoAlt: string | null;
};

type Bundle = {
  id: string;
  name: string;
  description: string;
  bundlePrice: number;
  totalPlatformsPrice: number;
  savings: number;
  is_active: boolean;
  created_at: string;
  platforms: Platform[];
};

export default async function BundleCatalogPage() {
  const res = await fetch('http://localhost:5192/api/bundles', { cache: 'no-store' });

const data = res.ok ? await res.json() : [];

const initialBundles: Bundle[] = Array.isArray(data)
  ? data.map((b: any) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      bundlePrice: b.bundlePrice,
      totalPlatformsPrice: b.totalPlatformsPrice,
      savings: b.savings,
      platforms: b.platforms ?? [],
      is_active: b.isActive,
      created_at: b.createdAt,
    }))
  : [];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BundleCatalogInteractive apiBundles={initialBundles} />
    </main>
  );
}
