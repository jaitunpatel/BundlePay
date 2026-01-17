'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BankTransferFormProps {
  onValidationChange: (isValid: boolean) => void;
}

const BankTransferForm = ({ onValidationChange }: BankTransferFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const isValid = selectedBank !== '' && accountNumber.length >= 8 && routingNumber.length === 9;
    onValidationChange(isValid);
  }, [selectedBank, accountNumber, routingNumber, onValidationChange, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  const banks = [
    { id: 'chase', name: 'Chase Bank' },
    { id: 'bofa', name: 'Bank of America' },
    { id: 'wells', name: 'Wells Fargo' },
    { id: 'citi', name: 'Citibank' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="bank" className="block text-sm font-medium text-text-primary mb-2">
          Select Your Bank
        </label>
        <select
          id="bank"
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        >
          <option value="">Choose a bank</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-text-primary mb-2">
          Account Number
        </label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter your account number"
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
      </div>

      <div>
        <label htmlFor="routingNumber" className="block text-sm font-medium text-text-primary mb-2">
          Routing Number
        </label>
        <input
          type="text"
          id="routingNumber"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').substring(0, 9))}
          placeholder="9-digit routing number"
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
      </div>

      <div className="p-4 bg-warning/10 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="ExclamationTriangleIcon" size={20} variant="outline" className="text-warning mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-text-primary font-medium mb-1">Processing Time</p>
            <p className="text-xs text-text-secondary">
              Bank transfers may take 2-3 business days to process. Your subscription will be activated once payment is confirmed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
        <Icon name="LockClosedIcon" size={20} variant="solid" className="text-success" />
        <p className="text-sm text-text-primary">
          Bank-level encryption protects your information
        </p>
      </div>
    </div>
  );
};

export default BankTransferForm;