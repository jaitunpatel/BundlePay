'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Platform {
  id: string;
  name: string;
  logo: string;
  alt: string;
  price: number;
  included: boolean;
}

interface ModifyBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundleName: string;
  currentPrice: number;
  platforms: Platform[];
  onSave: (selectedPlatforms: string[]) => void;
}

export default function ModifyBundleModal({
  isOpen,
  onClose,
  bundleName,
  currentPrice,
  platforms,
  onSave,
}: ModifyBundleModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platforms.filter(p => p.included).map(p => p.id)
  );

  if (!isOpen) return null;

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const calculateNewPrice = () => {
    return platforms
      .filter(p => selectedPlatforms.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  };

  const newPrice = calculateNewPrice();
  const priceDifference = newPrice - currentPrice;

  const handleSave = () => {
    onSave(selectedPlatforms);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-140"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-cinematic-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-text-primary mb-1">
                  Modify Bundle
                </h2>
                <p className="text-sm text-text-secondary">{bundleName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                aria-label="Close modal"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                Select Platforms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-smooth ${
                        isSelected
                          ? 'border-primary bg-primary/5' :'border-border bg-muted hover:border-primary/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <AppImage
                          src={platform.logo}
                          alt={platform.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-text-primary mb-1">{platform.name}</h4>
                        <p className="text-sm font-data text-primary">${platform.price.toFixed(2)}/mo</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth ${
                        isSelected
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {isSelected && (
                          <Icon name="CheckIcon" size={16} variant="outline" className="text-primary-foreground" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Current Price</span>
                <span className="font-data text-text-primary">${currentPrice.toFixed(2)}/mo</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">New Price</span>
                <span className="font-data font-semibold text-primary">${newPrice.toFixed(2)}/mo</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Price Change</span>
                <span className={`font-data font-bold ${
                  priceDifference > 0 ? 'text-error' : priceDifference < 0 ? 'text-success' : 'text-text-secondary'
                }`}>
                  {priceDifference > 0 ? '+' : ''}{priceDifference.toFixed(2)}/mo
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border bg-muted">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={selectedPlatforms.length === 0}
                className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}