import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CheckoutInteractive from './components/CheckoutInteractive';

export const metadata: Metadata = {
  title: 'Secure Checkout - StreamBundle',
  description: 'Complete your OTT bundle subscription purchase securely with multiple payment options including credit cards, digital wallets, and bank transfers.',
};

export default function CheckoutPaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CheckoutInteractive />
    </main>
  );
}