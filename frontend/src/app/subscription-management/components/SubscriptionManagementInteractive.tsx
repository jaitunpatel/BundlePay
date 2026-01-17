'use client';

import { useState, useEffect } from 'react';
import SubscriptionCard from './SubscriptionCard';
import BillingHistoryTable from './BillingHistoryTable';
import UsageAnalytics from './UsageAnalytics';
import PaymentMethodManager from './PaymentMethodManager';
import ModifyBundleModal from './ModifyBundleModal';
import PauseSubscriptionModal from './PauseSubscriptionModal';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import Icon from '@/components/ui/AppIcon';

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

interface BillingRecord {
  id: string;
  date: string;
  bundleName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  paymentMethod: string;
}

interface PlatformUsage {
  platform: string;
  logo: string;
  alt: string;
  hoursWatched: number;
  lastAccessed: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

interface ModifiablePlatform {
  id: string;
  name: string;
  logo: string;
  alt: string;
  price: number;
  included: boolean;
}

export default function SubscriptionManagementInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'billing' | 'analytics' | 'payment'>('subscriptions');
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const subscriptions: Subscription[] = [
  {
    id: '1',
    bundleName: 'Entertainment Plus Bundle',
    platforms: [
    { name: 'Netflix', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", alt: 'Netflix logo with red N on black background' },
    { name: 'Disney+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png", alt: 'Disney Plus logo with blue gradient background' },
    { name: 'Hulu', logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471", alt: 'Hulu logo with green background' }],

    price: 29.99,
    billingCycle: 'monthly',
    nextRenewal: '02/09/2026',
    status: 'active',
    autoRenew: true
  },
  {
    id: '2',
    bundleName: 'Sports Fanatic Package',
    platforms: [
    { name: 'ESPN+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png", alt: 'ESPN Plus logo with red and white sports theme' },
    { name: 'DAZN', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_13063443a-1765209264479.png", alt: 'DAZN logo with yellow and black sports branding' }],

    price: 24.99,
    billingCycle: 'monthly',
    nextRenewal: '02/15/2026',
    status: 'paused',
    autoRenew: false
  }];


  const billingRecords: BillingRecord[] = [
  { id: '1', date: '01/09/2026', bundleName: 'Entertainment Plus Bundle', amount: 29.99, status: 'paid', invoiceUrl: '#', paymentMethod: 'Visa •••• 4242' },
  { id: '2', date: '12/09/2025', bundleName: 'Entertainment Plus Bundle', amount: 29.99, status: 'paid', invoiceUrl: '#', paymentMethod: 'Visa •••• 4242' },
  { id: '3', date: '12/15/2025', bundleName: 'Sports Fanatic Package', amount: 24.99, status: 'paid', invoiceUrl: '#', paymentMethod: 'Mastercard •••• 5555' },
  { id: '4', date: '11/09/2025', bundleName: 'Entertainment Plus Bundle', amount: 29.99, status: 'paid', invoiceUrl: '#', paymentMethod: 'Visa •••• 4242' },
  { id: '5', date: '11/15/2025', bundleName: 'Sports Fanatic Package', amount: 24.99, status: 'failed', invoiceUrl: '#', paymentMethod: 'Mastercard •••• 5555' }];


  const platformUsage: PlatformUsage[] = [
  { platform: 'Netflix', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", alt: 'Netflix logo with red N on black background', hoursWatched: 45, lastAccessed: '01/08/2026' },
  { platform: 'Disney+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png", alt: 'Disney Plus logo with blue gradient background', hoursWatched: 32, lastAccessed: '01/07/2026' },
  { platform: 'Hulu', logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471", alt: 'Hulu logo with green background', hoursWatched: 28, lastAccessed: '01/06/2026' },
  { platform: 'ESPN+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1815c9257-1766933031901.png", alt: 'ESPN Plus logo with red and white sports theme', hoursWatched: 18, lastAccessed: '12/20/2025' }];


  const paymentMethods: PaymentMethod[] = [
  { id: '1', type: 'card', last4: '4242', brand: 'Visa', expiryDate: '12/2027', isDefault: true },
  { id: '2', type: 'card', last4: '5555', brand: 'Mastercard', expiryDate: '08/2026', isDefault: false }];


  const modifiablePlatforms: ModifiablePlatform[] = [
  { id: '1', name: 'Netflix', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dab497e5-1767166214108.png", alt: 'Netflix logo with red N on black background', price: 15.99, included: true },
  { id: '2', name: 'Disney+', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18ef6000e-1766475098020.png", alt: 'Disney Plus logo with blue gradient background', price: 10.99, included: true },
  { id: '3', name: 'Hulu', logo: "https://images.unsplash.com/photo-1662466984595-4cef19b73471", alt: 'Hulu logo with green background', price: 7.99, included: true },
  { id: '4', name: 'HBO Max', logo: "https://images.unsplash.com/photo-1662391253789-e1e29916fa86", alt: 'HBO Max logo with purple and white branding', price: 14.99, included: false },
  { id: '5', name: 'Prime Video', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9e3c618-1766750764402.png", alt: 'Amazon Prime Video logo with blue background', price: 8.99, included: false }];


  const handleModify = (id: string) => {
    const subscription = subscriptions.find((s) => s.id === id);
    if (subscription) {
      setSelectedSubscription(subscription);
      setModifyModalOpen(true);
    }
  };

  const handlePause = (id: string) => {
    const subscription = subscriptions.find((s) => s.id === id);
    if (subscription) {
      setSelectedSubscription(subscription);
      setPauseModalOpen(true);
    }
  };

  const handleCancel = (id: string) => {
    const subscription = subscriptions.find((s) => s.id === id);
    if (subscription) {
      setSelectedSubscription(subscription);
      setCancelModalOpen(true);
    }
  };

  const handleResume = (id: string) => {
    console.log('Resume subscription:', id);
  };

  const handleSaveModification = (selectedPlatforms: string[]) => {
    console.log('Save modification:', selectedPlatforms);
  };

  const handleConfirmPause = (resumeDate: string) => {
    console.log('Pause until:', resumeDate);
  };

  const handleConfirmCancel = (reason: string, feedback: string) => {
    console.log('Cancel reason:', reason, 'Feedback:', feedback);
  };

  const handleAddPaymentMethod = () => {
    console.log('Add new payment method');
  };

  const handleSetDefaultPayment = (id: string) => {
    console.log('Set default payment:', id);
  };

  const handleRemovePayment = (id: string) => {
    console.log('Remove payment method:', id);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading subscription management...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
            Subscription Management
          </h1>
          <p className="text-text-secondary">
            Manage your active subscriptions, billing, and payment methods
          </p>
        </div>

        <div className="mb-6 border-b border-border overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-smooth ${
              activeTab === 'subscriptions' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
              }>

              <Icon name="RectangleStackIcon" size={20} variant="outline" />
              <span>My Subscriptions</span>
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-smooth ${
              activeTab === 'billing' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
              }>

              <Icon name="DocumentTextIcon" size={20} variant="outline" />
              <span>Billing History</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-smooth ${
              activeTab === 'analytics' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
              }>

              <Icon name="ChartBarIcon" size={20} variant="outline" />
              <span>Usage Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-smooth ${
              activeTab === 'payment' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`
              }>

              <Icon name="CreditCardIcon" size={20} variant="outline" />
              <span>Payment Methods</span>
            </button>
          </div>
        </div>

        {activeTab === 'subscriptions' &&
        <div className="space-y-6">
            {subscriptions.map((subscription) =>
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onModify={handleModify}
            onPause={handlePause}
            onCancel={handleCancel}
            onResume={handleResume} />

          )}
          </div>
        }

        {activeTab === 'billing' &&
        <BillingHistoryTable records={billingRecords} />
        }

        {activeTab === 'analytics' &&
        <UsageAnalytics platformUsage={platformUsage} />
        }

        {activeTab === 'payment' &&
        <PaymentMethodManager
          paymentMethods={paymentMethods}
          onAddNew={handleAddPaymentMethod}
          onSetDefault={handleSetDefaultPayment}
          onRemove={handleRemovePayment} />

        }
      </div>

      {selectedSubscription &&
      <>
          <ModifyBundleModal
          isOpen={modifyModalOpen}
          onClose={() => setModifyModalOpen(false)}
          bundleName={selectedSubscription.bundleName}
          currentPrice={selectedSubscription.price}
          platforms={modifiablePlatforms}
          onSave={handleSaveModification} />

          <PauseSubscriptionModal
          isOpen={pauseModalOpen}
          onClose={() => setPauseModalOpen(false)}
          bundleName={selectedSubscription.bundleName}
          onConfirm={handleConfirmPause} />

          <CancelSubscriptionModal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          bundleName={selectedSubscription.bundleName}
          currentPrice={selectedSubscription.price}
          onConfirm={handleConfirmCancel} />

        </>
      }
    </div>);

}