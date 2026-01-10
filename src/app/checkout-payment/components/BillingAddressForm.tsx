'use client';

import { useState, useEffect } from 'react';

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface BillingAddressFormProps {
  onValidationChange: (isValid: boolean) => void;
}

const BillingAddressForm = ({ onValidationChange }: BillingAddressFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [useSameAddress, setUseSameAddress] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    if (useSameAddress) {
      onValidationChange(true);
    } else {
      const isValid = 
        formData.street.trim().length > 0 &&
        formData.city.trim().length > 0 &&
        formData.state.trim().length > 0 &&
        formData.zipCode.length === 5;
      onValidationChange(isValid);
    }
  }, [formData, useSameAddress, onValidationChange, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="sameAddress"
          checked={useSameAddress}
          onChange={(e) => setUseSameAddress(e.target.checked)}
          className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor="sameAddress" className="text-sm text-text-primary cursor-pointer">
          Use account address for billing
        </label>
      </div>

      {!useSameAddress && (
        <>
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-text-primary mb-2">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="123 Main Street"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-text-primary mb-2">
                State
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-text-primary mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '').substring(0, 5) })}
                placeholder="10001"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-text-primary mb-2">
                Country
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BillingAddressForm;