'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

interface PaymentMethodManagerProps {
  paymentMethods: PaymentMethod[];
  onAddNew: () => void;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function PaymentMethodManager({
  paymentMethods,
  onAddNew,
  onSetDefault,
  onRemove,
}: PaymentMethodManagerProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return 'CreditCardIcon';
      case 'paypal':
        return 'CurrencyDollarIcon';
      case 'bank':
        return 'BuildingLibraryIcon';
      default:
        return 'CreditCardIcon';
    }
  };

  const handleRemove = (id: string) => {
    onRemove(id);
    setShowConfirmDelete(null);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              Payment Methods
            </h2>
            <p className="text-sm text-text-secondary">
              Manage your payment options for subscriptions
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
          >
            <Icon name="PlusIcon" size={18} variant="outline" />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="relative">
            <div className={`p-4 rounded-lg border-2 transition-smooth ${
              method.isDefault
                ? 'border-primary bg-primary/5' :'border-border bg-muted hover:border-primary/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${method.isDefault ? 'bg-primary/20' : 'bg-background'}`}>
                  <Icon
                    name={getPaymentIcon(method.type) as any}
                    size={24}
                    variant="outline"
                    className={method.isDefault ? 'text-primary' : 'text-text-secondary'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-text-primary capitalize">{method.brand} {method.type}</h3>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    •••• •••• •••• {method.last4}
                  </p>
                  {method.type === 'card' && (
                    <p className="text-xs text-text-secondary">
                      Expires: {method.expiryDate}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => onSetDefault(method.id)}
                      className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition-smooth"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => setShowConfirmDelete(method.id)}
                    className="px-3 py-1 text-sm text-error hover:bg-error/10 rounded transition-smooth"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {showConfirmDelete === method.id && (
              <div className="absolute inset-0 bg-background/95 rounded-lg flex items-center justify-center p-4 z-10">
                <div className="text-center">
                  <Icon name="ExclamationTriangleIcon" size={48} variant="outline" className="mx-auto mb-3 text-warning" />
                  <p className="text-text-primary font-medium mb-4">
                    Remove this payment method?
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="px-4 py-2 bg-muted text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRemove(method.id)}
                      className="px-4 py-2 bg-error text-error-foreground font-medium rounded-md hover:bg-error/90 transition-smooth"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <Icon name="CreditCardIcon" size={48} variant="outline" className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-text-secondary mb-4">No payment methods added</p>
            <button
              onClick={onAddNew}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
            >
              Add Your First Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}