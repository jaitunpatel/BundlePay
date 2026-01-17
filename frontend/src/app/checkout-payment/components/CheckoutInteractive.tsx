'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import OrderSummary from './OrderSummary';
import PaymentMethodTabs from './PaymentMethodTabs';
import CreditCardForm from './CreditCardForm';
import DigitalWalletForm from './DigitalWalletForm';
import BankTransferForm from './BankTransferForm';
import BillingAddressForm from './BillingAddressForm';
import TermsAndConditions from './TermsAndConditions';
import SecurityBadges from './SecurityBadges';

interface BundleItem {
  id: string;
  name: string;
  price: number;
  platforms: string[];
  billingCycle: 'monthly' | 'yearly';
}

const CheckoutInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [cartItems, setCartItems] = useState<BundleItem[]>([
    {
      id: '1',
      name: 'Entertainment Plus Bundle',
      price: 29.99,
      platforms: ['Netflix', 'Disney+', 'Hulu'],
      billingCycle: 'monthly',
    },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-card rounded-lg animate-pulse" />
              <div className="h-48 bg-card rounded-lg animate-pulse" />
            </div>
            <div className="h-96 bg-card rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    if (cartItems.length <= 1) {
      router.push('/bundle-catalog');
    }
  };

  const handleModifyOrder = () => {
    router.push('/bundle-catalog');
  };

  const handleProcessPayment = async () => {
    if (!isPaymentValid || !isAddressValid || !termsAccepted) {
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/subscription-management');
  };

  const isFormValid = isPaymentValid && isAddressValid && termsAccepted;

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-smooth mb-4"
          >
            <Icon name="ChevronLeftIcon" size={20} variant="outline" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            Secure Checkout
          </h1>
          <p className="text-text-secondary mt-2">
            Complete your purchase securely and start streaming today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-cinematic">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Payment Method
              </h2>
              <PaymentMethodTabs
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
              />
              {selectedPaymentMethod === 'card' && (
                <CreditCardForm onValidationChange={setIsPaymentValid} />
              )}
              {selectedPaymentMethod === 'wallet' && (
                <DigitalWalletForm onValidationChange={setIsPaymentValid} />
              )}
              {selectedPaymentMethod === 'bank' && (
                <BankTransferForm onValidationChange={setIsPaymentValid} />
              )}
            </div>

            <div className="bg-card rounded-lg p-6 shadow-cinematic">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Billing Address
              </h2>
              <BillingAddressForm onValidationChange={setIsAddressValid} />
            </div>

            <TermsAndConditions onAcceptanceChange={setTermsAccepted} />

            <SecurityBadges />
          </div>

          <div className="space-y-6">
            <OrderSummary
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onModify={handleModifyOrder}
            />

            <button
              onClick={handleProcessPayment}
              disabled={!isFormValid || isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-smooth flex items-center justify-center gap-3 ${
                isFormValid && !isProcessing
                  ? 'bg-primary text-primary-foreground hover:shadow-glow-primary'
                  : 'bg-muted text-text-secondary cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <Icon name="ArrowPathIcon" size={24} variant="outline" className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Icon name="LockClosedIcon" size={24} variant="solid" />
                  <span>Complete Purchase</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-text-secondary">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <>
          <div
            className="fixed inset-0 bg-background/90 z-140"
            aria-hidden="true"
          />
          <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-card rounded-lg shadow-cinematic-lg z-150 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Payment Successful!
              </h3>
              <p className="text-text-secondary mb-6">
                Your subscription has been activated. Welcome to StreamBundle!
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleSuccessClose}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                >
                  View My Subscriptions
                </button>
                <button
                  onClick={() => router.push('/landing-page')}
                  className="w-full py-3 px-4 bg-muted text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutInteractive;