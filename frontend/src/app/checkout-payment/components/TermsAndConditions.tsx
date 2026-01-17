'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TermsAndConditionsProps {
  onAcceptanceChange: (accepted: boolean) => void;
}

const TermsAndConditions = ({ onAcceptanceChange }: TermsAndConditionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [autoRenewAccepted, setAutoRenewAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    onAcceptanceChange(termsAccepted && autoRenewAccepted);
  }, [termsAccepted, autoRenewAccepted, onAcceptanceChange, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="space-y-3">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="h-6 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 mt-1 text-primary bg-input border-border rounded focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="terms" className="flex-1 text-sm text-text-primary cursor-pointer">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary hover:underline font-medium"
            >
              Terms and Conditions
            </button>
            {' '}and{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="autoRenew"
            checked={autoRenewAccepted}
            onChange={(e) => setAutoRenewAccepted(e.target.checked)}
            className="w-4 h-4 mt-1 text-primary bg-input border-border rounded focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="autoRenew" className="flex-1 text-sm text-text-primary cursor-pointer">
            I understand that my subscription will automatically renew each billing cycle. I can cancel anytime from my account settings.
          </label>
        </div>

        <div className="flex items-start gap-2 pt-2 border-t border-border">
          <Icon name="ShieldCheckIcon" size={16} variant="solid" className="text-success mt-0.5" />
          <p className="text-xs text-text-secondary">
            Your subscription is protected by our 30-day money-back guarantee. Cancel anytime with no questions asked.
          </p>
        </div>
      </div>

      {showTermsModal && (
        <>
          <div
            className="fixed inset-0 bg-background/80 z-140"
            onClick={() => setShowTermsModal(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-card rounded-lg shadow-cinematic-lg z-150 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                Terms and Conditions
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                aria-label="Close modal"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-sm text-text-secondary">
                <p>
                  By subscribing to StreamBundle services, you agree to the following terms and conditions:
                </p>
                <h4 className="font-medium text-text-primary">1. Subscription Terms</h4>
                <p>
                  Your subscription will automatically renew at the end of each billing cycle unless cancelled. You will be charged the then-current subscription rate.
                </p>
                <h4 className="font-medium text-text-primary">2. Cancellation Policy</h4>
                <p>
                  You may cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing period.
                </p>
                <h4 className="font-medium text-text-primary">3. Refund Policy</h4>
                <p>
                  We offer a 30-day money-back guarantee for new subscriptions. Refund requests must be submitted within 30 days of initial purchase.
                </p>
                <h4 className="font-medium text-text-primary">4. Service Availability</h4>
                <p>
                  Platform availability may vary by region. We reserve the right to modify bundle offerings and pricing with 30 days notice.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
              >
                I Understand
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TermsAndConditions;