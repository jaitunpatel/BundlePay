'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DigitalWalletFormProps {
  onValidationChange: (isValid: boolean) => void;
}

const DigitalWalletForm = ({ onValidationChange }: DigitalWalletFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    onValidationChange(selectedWallet !== '');
  }, [selectedWallet, onValidationChange, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-16 bg-muted rounded-lg animate-pulse" />
        <div className="h-16 bg-muted rounded-lg animate-pulse" />
        <div className="h-16 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  const wallets = [
    { id: 'paypal', name: 'PayPal', icon: 'CreditCardIcon', description: 'Pay with your PayPal account' },
    { id: 'applepay', name: 'Apple Pay', icon: 'DevicePhoneMobileIcon', description: 'Quick payment with Apple Pay' },
    { id: 'googlepay', name: 'Google Pay', icon: 'DevicePhoneMobileIcon', description: 'Fast checkout with Google Pay' },
  ];

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => (
        <button
          key={wallet.id}
          onClick={() => setSelectedWallet(wallet.id)}
          className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-smooth ${
            selectedWallet === wallet.id
              ? 'border-primary bg-primary/10' :'border-border bg-muted hover:border-primary/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            selectedWallet === wallet.id ? 'bg-primary' : 'bg-background'
          }`}>
            <Icon 
              name={wallet.icon as any} 
              size={24} 
              variant="outline" 
              className={selectedWallet === wallet.id ? 'text-primary-foreground' : 'text-text-secondary'} 
            />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-text-primary">{wallet.name}</p>
            <p className="text-sm text-text-secondary">{wallet.description}</p>
          </div>
          <Icon 
            name="CheckCircleIcon" 
            size={24} 
            variant={selectedWallet === wallet.id ? 'solid' : 'outline'} 
            className={selectedWallet === wallet.id ? 'text-success' : 'text-text-secondary'} 
          />
        </button>
      ))}

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} variant="outline" className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-text-primary font-medium mb-1">Secure Payment</p>
            <p className="text-xs text-text-secondary">
              You will be redirected to complete the payment securely through your selected digital wallet provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalWalletForm;