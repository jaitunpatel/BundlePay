import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SubscriptionManagementInteractive from './components/SubscriptionManagementInteractive';

export const metadata: Metadata = {
  title: 'Subscription Management - StreamBundle',
  description: 'Manage your active streaming bundle subscriptions, view billing history, track usage analytics, and update payment methods all in one place.',
};

export default function SubscriptionManagementPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SubscriptionManagementInteractive />
    </main>
  );
}