import Icon from '@/components/ui/AppIcon';

interface BundleItem {
  id: string;
  name: string;
  price: number;
  platforms: string[];
  billingCycle: 'monthly' | 'yearly';
}

interface OrderSummaryProps {
  items: BundleItem[];
  onRemoveItem: (id: string) => void;
  onModify: () => void;
}

const OrderSummary = ({ items, onRemoveItem, onModify }: OrderSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-card rounded-lg p-6 shadow-cinematic">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">Order Summary</h2>
        <button
          onClick={onModify}
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
        >
          Modify
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 bg-muted rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-2">{item.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {item.platforms.map((platform, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-background rounded text-text-secondary">
                    {platform}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-secondary capitalize">{item.billingCycle} billing</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-text-secondary hover:text-error transition-smooth"
                aria-label="Remove item"
              >
                <Icon name="XMarkIcon" size={20} variant="outline" />
              </button>
              <span className="font-data font-semibold text-text-primary">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span className="font-data">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Tax (8%)</span>
          <span className="font-data">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-semibold text-text-primary pt-3 border-t border-border">
          <span>Total</span>
          <span className="font-data">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} variant="outline" className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-text-primary font-medium mb-1">Auto-Renewal Active</p>
            <p className="text-xs text-text-secondary">
              Your subscription will automatically renew on the billing date. You can cancel anytime from your account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;