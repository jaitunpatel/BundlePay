'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/components/common/CartProvider';

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
};

function SparklesIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-90"
      aria-hidden="true"
    >
      <path
        d="M12 2l1.2 4.2L17.4 7.4l-4.2 1.2L12 12l-1.2-3.4L6.6 7.4l4.2-1.2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19 11l.8 2.6L22 14l-2.2.4L19 17l-.8-2.6L16 14l2.2-.4L19 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 13l.8 2.6L8 16l-2.2.4L5 19l-.8-2.6L2 16l2.2-.4L5 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BundlePanel({
  selectedServices,
}: {
  selectedServices: Service[];
}) {

  const { addToCart } = useCart();
  const customBundleId =
    'custom:' + selectedServices.map((s) => s.id).sort().join('|');

  const hasSelections = selectedServices.length > 0;

  const bundlePrice = selectedServices.reduce((sum, s) => {
    const n =
      typeof s.price === 'number'
        ? s.price
        : parseFloat(String(s.price).replace(/[^0-9.]/g, ''));

    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-card rounded-lg shadow-cinematic border border-white/10 p-5">
        {!hasSelections ? (
          <div className="flex flex-col items-center text-center py-10">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <SparklesIcon />
            </div>

            <p className="text-lg font-heading font-semibold text-text-primary">
              Build Your Bundle
            </p>

            <p className="mt-2 text-sm text-text-secondary max-w-[260px]">
              Select platforms to see your personalized pricing
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-heading font-semibold text-text-primary">
                  Your Bundle Summary
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {selectedServices.length} platform{selectedServices.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            {/* Selected services chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedServices.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-sm"
                >
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center overflow-hidden">
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.name}
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      <div className="w-3 h-3 rounded bg-muted" />
                    )}
                  </div>
                  <span className="text-text-primary">{s.name}</span>
                </div>
              ))}
            </div>

            {/* Pricing section (placeholder for now) */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <p className="text-sm text-text-secondary mb-1">Bundle price</p>
                <span className="text-text-primary font-semibold">
                  <p className="text-2xl font-bold text-primary">
                    ${bundlePrice.toFixed(2)}
                    <span className="text-sm font-normal text-text-secondary"> / month</span>
                  </p>
                </span>
              </div>

              <button
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasSelections}
                onClick={() => {
                  if (!hasSelections) return;

                  addToCart({
                    id: customBundleId,
                    name: 'Custom Bundle',
                    price: Number(bundlePrice.toFixed(2)),
                    platforms: selectedServices.map((s) => s.name),
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuildYourOwnGrid({
  services,
  categories,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedServices = useMemo(() => {
    const set = new Set(selectedServiceIds);
    return services.filter((s) => set.has(s.id));
  }, [services, selectedServiceIds]);

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

      {/* Services + Bundle Panel (same 4-slot width, but 3 cards + 1 panel) */}
      {services.length === 0 ? (
        <p className="text-text-secondary">No services found.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {/* Left: 3 slots for services */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
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
                    {/* Selected check */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}

                    <div className="p-4 flex flex-col items-center text-center">
                      {/* bigger icon */}
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

                      {/* name */}
                      <p className="mt-3 text-lg font-heading font-semibold text-text-primary">
                        {s.name}
                      </p>

                      {/* price */}
                      <p className="mt-2 text-2xl font-bold text-primary">
                        ${Number(s.price).toFixed(2)}
                        <span className="text-sm font-normal text-text-secondary"> / month</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: 1 slot for bundle panel */}
          <div className="lg:col-span-1">
            <BundlePanel selectedServices={selectedServices} />
          </div>
        </div>
      )}
    </div>
  );
}
