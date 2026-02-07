'use client';

import { useState } from 'react';

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

      {/* Services Grid */}
      {services.length === 0 ? (
        <p className="text-text-secondary">No services found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  isSelected
                    ? 'border-2 border-primary'
                    : 'border border-white/10'
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
                  <p className="mt-3 text-base font-heading font-semibold text-text-primary line-clamp-1">
                    {s.name}
                  </p>

                  {/* price */}
                  <p className="mt-1 text-sm text-text-secondary">
                    ${Number(s.price).toFixed(2)} / month
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
