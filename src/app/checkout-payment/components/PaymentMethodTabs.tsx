'use client';


import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface PaymentMethodTabsProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

const PaymentMethodTabs = ({ selectedMethod, onMethodChange }: PaymentMethodTabsProps) => {
  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCardIcon' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'WalletIcon' },
    { id: 'bank', name: 'Bank Transfer', icon: 'BuildingLibraryIcon' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-smooth ${
            selectedMethod === method.id
              ? 'bg-primary text-primary-foreground shadow-glow-primary'
              : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-input'
          }`}
        >
          <Icon name={method.icon as any} size={20} variant="outline" />
          <span className="hidden sm:inline">{method.name}</span>
          <span className="sm:hidden">{method.name.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodTabs;