'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Platform {
  name: string;
  logo: string;
  alt: string;
}

interface Subscription {
  id: string;
  bundleName: string;
  platforms: Platform[];
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextRenewal: string;
  status: 'active' | 'paused' | 'cancelled';
  autoRenew: boolean;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  onModify: (id: string) => void;
  onPause: (id: string) => void;
  onCancel: (id: string) => void;
  onResume: (id: string) => void;
}

export default function SubscriptionCard({
  subscription,
  onModify,
  onPause,
  onCancel,
  onResume,
}: SubscriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 text-success';
      case 'paused':
        return 'bg-warning/20 text-warning';
      case 'cancelled':
        return 'bg-error/20 text-error';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'CheckCircleIcon';
      case 'paused':
        return 'PauseCircleIcon';
      case 'cancelled':
        return 'XCircleIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-cinematic transition-smooth">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                {subscription.bundleName}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(subscription.status)}`}>
                <Icon name={getStatusIcon(subscription.status) as any} size={14} variant="solid" className="inline mr-1" />
                {subscription.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <Icon name="CalendarIcon" size={16} variant="outline" />
                Next renewal: {subscription.nextRenewal}
              </span>
              <span className="flex items-center gap-1">
                <Icon name={subscription.autoRenew ? 'ArrowPathIcon' : 'XMarkIcon'} size={16} variant="outline" />
                Auto-renew: {subscription.autoRenew ? 'On' : 'Off'}
              </span>
            </div>
          </div>
          <div className="text-left lg:text-right">
            <div className="text-3xl font-data font-bold text-primary mb-1">
              ${subscription.price.toFixed(2)}
            </div>
            <div className="text-sm text-text-secondary capitalize">
              per {subscription.billingCycle === 'monthly' ? 'month' : 'year'}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
          >
            <span>Included Platforms ({subscription.platforms.length})</span>
            <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} variant="outline" />
          </button>
          {isExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
              {subscription.platforms.map((platform, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                    <AppImage
                      src={platform.logo}
                      alt={platform.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-text-primary truncate">{platform.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {subscription.status === 'active' && (
            <>
              <button
                onClick={() => onModify(subscription.id)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
              >
                <Icon name="PencilSquareIcon" size={18} variant="outline" />
                <span>Modify Bundle</span>
              </button>
              <button
                onClick={() => onPause(subscription.id)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
              >
                <Icon name="PauseIcon" size={18} variant="outline" />
                <span>Pause</span>
              </button>
              <button
                onClick={() => onCancel(subscription.id)}
                className="flex items-center gap-2 px-4 py-2 bg-error/20 text-error font-medium rounded-md hover:bg-error/30 transition-smooth"
              >
                <Icon name="XMarkIcon" size={18} variant="outline" />
                <span>Cancel</span>
              </button>
            </>
          )}
          {subscription.status === 'paused' && (
            <button
              onClick={() => onResume(subscription.id)}
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
            >
              <Icon name="PlayIcon" size={18} variant="outline" />
              <span>Resume Subscription</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}