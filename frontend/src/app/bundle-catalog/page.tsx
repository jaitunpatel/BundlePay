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

type Service = {
  id: string;
  name: string;
  serviceStatus: number;
  serviceCategory: number;
  price: number;
  imageUrl: string | null;
};

export default async function BundleCatalogPage() {
  // Fetch both in parallel (same "standard" style)
  const [bundlesRes, servicesRes] = await Promise.all([
    fetch('http://localhost:5192/api/bundles', { cache: 'no-store' }),
    fetch('http://localhost:5192/api/services', { cache: 'no-store' }),
  ]);

  const bundlesData = bundlesRes.ok ? await bundlesRes.json() : [];
  const servicesData = servicesRes.ok ? await servicesRes.json() : [];

  const initialBundles: Bundle[] = Array.isArray(bundlesData)
    ? bundlesData.map((b: any) => ({
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

  const initialServices: Service[] = Array.isArray(servicesData)
    ? servicesData.map((s: any) => ({
        id: s.id,
        name: s.name,
        serviceStatus: s.serviceStatus,
        serviceCategory: s.serviceCategory,
        price: s.price,
        imageUrl: s.imageUrl ?? null,
      }))
    : [];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BundleCatalogInteractive
        apiBundles={initialBundles}
        apiServices={initialServices}
      />
    </main>
  );
}
