'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { createBundle } from '@/lib/bundleApi';
import { AuthenticationError } from '@/lib/cartApi';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';

type Service = {
  id: string;
  name: string;
  price: number | string;
  imageUrl?: string | null;
  serviceCategory?: number | null;
};

type Category = { id: number; label: string };

type Props = {
  services: Service[];
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
  onBundleCreated?: () => Promise<void> | void;
};

export default function BuildYourOwnGrid({
  services,
  categories,
  selectedCategory,
  onSelectCategory,
  onBundleCreated,
}: Props) {
  const router = useRouter();
  const { userEmail } = useAuth();
  const { fetchCart } = useCart();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [isCreateBundleModalOpen, setIsCreateBundleModalOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [isCreatingBundle, setIsCreatingBundle] = useState(false);
  const [createBundleError, setCreateBundleError] = useState<string | null>(null);
  const [createBundleNotice, setCreateBundleNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const selectedServices = useMemo(
    () => services.filter((service) => selectedServiceIds.includes(service.id)),
    [services, selectedServiceIds]
  );

  const originalTotal = useMemo(
    () => selectedServices.reduce((sum, service) => sum + Number(service.price), 0),
    [selectedServices]
  );

  const discountRate = selectedServices.length >= 3 ? 0.2 : selectedServices.length === 2 ? 0.1 : 0;
  const monthlySavings = originalTotal * discountRate;
  const bundlePrice = originalTotal - monthlySavings;
  const yearlySavings = monthlySavings * 12;

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openCreateBundleModal = () => {
    setCreateBundleError(null);
    setIsCreateBundleModalOpen(true);
  };

  const closeCreateBundleModal = () => {
    setIsCreateBundleModalOpen(false);
    setBundleName('');
    setCreateBundleError(null);
  };

  const handleCreateBundle = async () => {
    if (!bundleName.trim()) return;
    if (selectedServiceIds.length === 0) {
      setCreateBundleError('Select at least one service to create a bundle.');
      return;
    }

    if (!userEmail) {
      router.push('/sign-in?from=/bundle-catalog');
      return;
    }

    try {
      setIsCreatingBundle(true);
      setCreateBundleError(null);

      await createBundle({
        name: bundleName.trim(),
        description: `Custom bundle with ${selectedServiceIds.length} services`,
        price: Number(bundlePrice.toFixed(2)),
        bundleType: 1,
        serviceIds: selectedServiceIds,
      });

      await fetchCart();
      if (onBundleCreated) {
        await onBundleCreated();
      }
      closeCreateBundleModal();
      setCreateBundleNotice({
        message: `"${bundleName.trim()}" created successfully and added to cart.`,
        type: 'success',
      });
      setTimeout(() => setCreateBundleNotice(null), 3000);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        router.push('/sign-in?from=/bundle-catalog');
        return;
      }

      const message = error instanceof Error ? error.message : 'Failed to create bundle';
      setCreateBundleError(message);
      setCreateBundleNotice({
        message,
        type: 'error',
      });
      setTimeout(() => setCreateBundleNotice(null), 3000);
    } finally {
      setIsCreatingBundle(false);
    }
  };

  return (
    <div>
      {/* Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategory(isActive ? null : c.id)}
              className={[
                'rounded-full px-4 py-1.5 text-sm border transition-smooth',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-text-primary border-white/20 hover:border-white/40',
              ].join(' ')}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Services + Summary */}
      {services.length === 0 ? (
        <p className="text-text-secondary">No services found.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(320px,1fr)] items-start">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => {
              const isSelected = selectedServiceIds.includes(s.id);

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  className={[
                    'relative text-left bg-card rounded-lg overflow-hidden shadow-cinematic transition-smooth group w-full',
                    'hover:shadow-cinematic-lg',
                    isSelected ? 'border-2 border-primary' : 'border border-white/10',
                  ].join(' ')}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="CheckIcon" size={16} className="text-white" />
                    </div>
                  )}

                  <div className="p-4 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center overflow-hidden border border-border/40">
                      {s.imageUrl ? (
                        <img
                          src={s.imageUrl}
                          alt={s.name}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-muted" />
                      )}
                    </div>

                    <p className="mt-3 text-base font-heading font-semibold text-text-primary line-clamp-1">
                      {s.name}
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-data font-bold text-primary">
                        ${Number(s.price).toFixed(2)}
                      </span>
                      <span className="text-text-secondary">/month</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <aside className="rounded-2xl border border-primary/30 bg-card p-5 shadow-cinematic lg:sticky lg:top-24">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                <Icon name="SparklesIcon" size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-text-primary">Your Bundle Summary</h3>
                <p className="text-text-secondary text-sm">
                  {selectedServices.length} platform{selectedServices.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            {selectedServices.length > 0 ? (
              <>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedServices.map((service) => (
                    <span
                      key={service.id}
                      className="inline-flex items-center rounded-full border border-white/15 bg-muted/50 px-3 py-1 text-sm text-text-primary"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Original total</span>
                    <span className="text-text-primary line-through/80">${originalTotal.toFixed(2)}/mo</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Bundle discount</span>
                    <span className="text-success">-{Math.round(discountRate * 100)}%</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-heading font-semibold text-text-primary">Bundle price</span>
                    <span className="text-2xl font-data font-bold text-success">
                      ${bundlePrice.toFixed(2)}
                      <span className="text-base text-text-secondary font-medium">/mo</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-success/25 bg-success/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary font-medium">Monthly savings</span>
                    <span className="text-success font-semibold">${monthlySavings.toFixed(2)}</span>
                  </div>
                </div>

                <p className="mt-3 text-center text-sm text-text-secondary">
                  That's <span className="text-success font-semibold">${yearlySavings.toFixed(2)}</span> saved per year.
                </p>

                <button
                  type="button"
                  onClick={openCreateBundleModal}
                  className="mt-4 w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                >
                  Create Bundle
                </button>
              </>
            ) : (
              <p className="mt-4 text-sm text-text-secondary">
                Select services to see your custom bundle price, discount, and savings.
              </p>
            )}
          </aside>
        </div>
      )}

      {isCreateBundleModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-140"
            onClick={closeCreateBundleModal}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg shadow-cinematic-xl max-w-md w-full overflow-hidden border border-border">
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">Name Your Bundle</h2>
                  <button
                    type="button"
                    onClick={closeCreateBundleModal}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                    aria-label="Close modal"
                  >
                    <Icon name="XMarkIcon" size={20} variant="outline" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-text-secondary">
                  Enter a name for your custom bundle.
                </p>
              </div>

              <div className="p-5">
                <label htmlFor="bundleName" className="block text-sm font-medium text-text-primary mb-2">
                  Bundle name
                </label>
                <input
                  id="bundleName"
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  placeholder="e.g. Weekend Chill Pack"
                  className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {createBundleError && (
                  <p className="mt-2 text-sm text-error">{createBundleError}</p>
                )}
              </div>

              <div className="p-5 border-t border-border bg-muted flex gap-3">
                <button
                  type="button"
                  onClick={closeCreateBundleModal}
                  className="flex-1 py-2.5 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateBundle}
                  disabled={!bundleName.trim() || isCreatingBundle}
                  className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingBundle ? 'Creating...' : 'Create Bundle'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {createBundleNotice && (
        <div
          className={`fixed bottom-6 right-6 z-140 px-6 py-4 rounded-lg shadow-cinematic-lg flex items-center gap-3 animate-slide-up ${
            createBundleNotice.type === 'success'
              ? 'bg-success text-success-foreground'
              : 'bg-error text-error-foreground'
          }`}
        >
          <Icon
            name={createBundleNotice.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'}
            size={24}
            variant="solid"
          />
          <span className="font-medium">{createBundleNotice.message}</span>
        </div>
      )}
    </div>
  );
}
