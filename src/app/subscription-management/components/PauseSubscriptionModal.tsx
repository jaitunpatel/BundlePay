'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PauseSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundleName: string;
  onConfirm: (resumeDate: string) => void;
}

export default function PauseSubscriptionModal({
  isOpen,
  onClose,
  bundleName,
  onConfirm,
}: PauseSubscriptionModalProps) {
  const [resumeDate, setResumeDate] = useState('');

  if (!isOpen) return null;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleConfirm = () => {
    if (resumeDate) {
      onConfirm(resumeDate);
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-140"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-cinematic-xl max-w-md w-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-semibold text-text-primary">
                Pause Subscription
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                aria-label="Close modal"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg mb-6">
              <Icon name="InformationCircleIcon" size={24} variant="outline" className="text-warning flex-shrink-0" />
              <div className="text-sm text-text-primary">
                <p className="font-medium mb-1">Important Information</p>
                <p className="text-text-secondary">
                  Your subscription to <span className="font-medium text-text-primary">{bundleName}</span> will be paused immediately. You can resume it anytime before the selected date.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="resumeDate" className="block text-sm font-medium text-text-primary mb-2">
                Select Resume Date
              </label>
              <input
                type="date"
                id="resumeDate"
                value={resumeDate}
                onChange={(e) => setResumeDate(e.target.value)}
                min={minDateString}
                max={maxDateString}
                className="w-full px-4 py-3 bg-input border border-border rounded-md text-text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none transition-smooth"
              />
              <p className="text-xs text-text-secondary mt-2">
                You can pause for up to 3 months
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <h3 className="font-medium text-text-primary mb-2">What happens when paused?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-success flex-shrink-0 mt-0.5" />
                  <span>No charges during pause period</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-success flex-shrink-0 mt-0.5" />
                  <span>Access to all platforms will be suspended</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-success flex-shrink-0 mt-0.5" />
                  <span>Automatic resumption on selected date</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-success flex-shrink-0 mt-0.5" />
                  <span>Resume manually anytime before scheduled date</span>
                </li>
              </ul>
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
                onClick={handleConfirm}
                disabled={!resumeDate}
                className="flex-1 py-3 px-4 bg-warning text-warning-foreground font-medium rounded-md hover:bg-warning/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pause Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}