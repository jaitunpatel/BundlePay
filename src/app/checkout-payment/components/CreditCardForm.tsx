'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CardFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface CreditCardFormProps {
  onValidationChange: (isValid: boolean) => void;
}

const CreditCardForm = ({ onValidationChange }: CreditCardFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});
  const [useSavedCard, setUseSavedCard] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const isValid = 
      formData.cardNumber.replace(/\s/g, '').length === 16 &&
      formData.cardName.trim().length > 0 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length === 3;
    
    onValidationChange(isValid || useSavedCard);
  }, [formData, useSavedCard, onValidationChange, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-muted rounded-lg animate-pulse" />
          <div className="h-12 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
    if (formatted.replace(/\s/g, '').length !== 16) {
      setErrors({ ...errors, cardNumber: 'Invalid card number' });
    } else {
      const { cardNumber, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setFormData({ ...formData, cvv: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
        <input
          type="checkbox"
          id="savedCard"
          checked={useSavedCard}
          onChange={(e) => setUseSavedCard(e.target.checked)}
          className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="savedCard" className="flex-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <Icon name="CreditCardIcon" size={20} variant="outline" className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Visa ending in 4242</p>
              <p className="text-xs text-text-secondary">Expires 12/2025</p>
            </div>
          </div>
          <Icon name="CheckCircleIcon" size={20} variant={useSavedCard ? 'solid' : 'outline'} className={useSavedCard ? 'text-success' : 'text-text-secondary'} />
        </label>
      </div>

      {!useSavedCard && (
        <>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-text-primary mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 bg-input border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                  errors.cardNumber ? 'border-error' : 'border-border'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <Icon name="CreditCardIcon" size={20} variant="outline" className="text-text-secondary" />
              </div>
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-error mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-text-primary mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardName"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-text-primary mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-text-primary mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cvv"
                  value={formData.cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
                  aria-label="CVV information"
                >
                  <Icon name="QuestionMarkCircleIcon" size={18} variant="outline" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
        <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
        <p className="text-sm text-text-primary">
          Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default CreditCardForm;