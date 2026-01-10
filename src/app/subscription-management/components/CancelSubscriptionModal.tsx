'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundleName: string;
  currentPrice: number;
  onConfirm: (reason: string, feedback: string) => void;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  bundleName,
  currentPrice,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const [step, setStep] = useState<'reason' | 'retention' | 'confirm'>('reason');
  const [selectedReason, setSelectedReason] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const cancellationReasons = [
    'Too expensive',
    'Not using enough',
    'Found better alternative',
    'Technical issues',
    'Content not satisfactory',
    'Other',
  ];

  const retentionOffer = {
    discount: 20,
    newPrice: currentPrice * 0.8,
    duration: 3,
  };

  const handleReasonSubmit = () => {
    setStep('retention');
  };

  const handleAcceptOffer = () => {
    onClose();
    setStep('reason');
    setSelectedReason('');
    setFeedback('');
  };

  const handleDeclineOffer = () => {
    setStep('confirm');
  };

  const handleFinalConfirm = () => {
    onConfirm(selectedReason, feedback);
    onClose();
    setStep('reason');
    setSelectedReason('');
    setFeedback('');
  };

  const handleClose = () => {
    onClose();
    setStep('reason');
    setSelectedReason('');
    setFeedback('');
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-140"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-cinematic-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-semibold text-text-primary">
                {step === 'reason' && 'Cancel Subscription'}
                {step === 'retention' && 'Special Offer for You'}
                {step === 'confirm' && 'Confirm Cancellation'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                aria-label="Close modal"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {step === 'reason' && (
              <>
                <p className="text-text-secondary mb-6">
                  We're sorry to see you go. Please help us improve by telling us why you're canceling <span className="font-medium text-text-primary">{bundleName}</span>.
                </p>

                <div className="space-y-2 mb-6">
                  {cancellationReasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-smooth text-left ${
                        selectedReason === reason
                          ? 'border-primary bg-primary/5' :'border-border bg-muted hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-smooth ${
                        selectedReason === reason
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {selectedReason === reason && (
                          <Icon name="CheckIcon" size={14} variant="outline" className="text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-text-primary">{reason}</span>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label htmlFor="feedback" className="block text-sm font-medium text-text-primary mb-2">
                    Additional Feedback (Optional)
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="Tell us more about your experience..."
                    className="w-full px-4 py-3 bg-input border border-border rounded-md text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none transition-smooth resize-none"
                  />
                </div>
              </>
            )}

            {step === 'retention' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="GiftIcon" size={32} variant="outline" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Wait! We Have a Special Offer
                  </h3>
                  <p className="text-text-secondary">
                    We value your subscription and want to make it work for you
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-6 mb-6 border border-primary/30">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-data font-bold text-primary mb-2">
                      {retentionOffer.discount}% OFF
                    </div>
                    <p className="text-text-secondary">for the next {retentionOffer.duration} months</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-2xl font-data text-text-secondary line-through">
                      ${currentPrice.toFixed(2)}
                    </span>
                    <Icon name="ArrowRightIcon" size={24} variant="outline" className="text-text-secondary" />
                    <span className="text-3xl font-data font-bold text-primary">
                      ${retentionOffer.newPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-text-secondary">
                      Save ${((currentPrice - retentionOffer.newPrice) * retentionOffer.duration).toFixed(2)} over {retentionOffer.duration} months
                    </p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-text-primary mb-3">What you'll keep:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
                      <span>Access to all platforms in your bundle</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
                      <span>No interruption to your streaming</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
                      <span>Automatic discount applied to next billing</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {step === 'confirm' && (
              <>
                <div className="flex items-start gap-3 p-4 bg-error/10 border border-error/30 rounded-lg mb-6">
                  <Icon name="ExclamationTriangleIcon" size={24} variant="outline" className="text-error flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-text-primary mb-1">Are you sure?</p>
                    <p className="text-text-secondary">
                      Your subscription to <span className="font-medium text-text-primary">{bundleName}</span> will be cancelled at the end of your current billing period.
                    </p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-text-primary mb-3">What happens next:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckIcon" size={16} variant="outline" className="text-text-secondary flex-shrink-0 mt-0.5" />
                      <span>Access continues until end of billing period</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckIcon" size={16} variant="outline" className="text-text-secondary flex-shrink-0 mt-0.5" />
                      <span>No further charges will be made</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckIcon" size={16} variant="outline" className="text-text-secondary flex-shrink-0 mt-0.5" />
                      <span>You can resubscribe anytime</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <Icon name="CheckIcon" size={16} variant="outline" className="text-text-secondary flex-shrink-0 mt-0.5" />
                      <span>Cancellation confirmation will be sent via email</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="p-6 border-t border-border bg-muted">
            <div className="flex gap-3">
              {step === 'reason' && (
                <>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={handleReasonSubmit}
                    disabled={!selectedReason}
                    className="flex-1 py-3 px-4 bg-error text-error-foreground font-medium rounded-md hover:bg-error/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </>
              )}
              {step === 'retention' && (
                <>
                  <button
                    onClick={handleDeclineOffer}
                    className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                  >
                    No Thanks
                  </button>
                  <button
                    onClick={handleAcceptOffer}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                  >
                    Accept Offer
                  </button>
                </>
              )}
              {step === 'confirm' && (
                <>
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                  >
                    Keep Subscription
                  </button>
                  <button
                    onClick={handleFinalConfirm}
                    className="flex-1 py-3 px-4 bg-error text-error-foreground font-medium rounded-md hover:bg-error/90 transition-smooth"
                  >
                    Confirm Cancellation
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}