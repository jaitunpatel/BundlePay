import Icon from '@/components/ui/AppIcon';

interface PricingItem {
  platform: string;
  individualPrice: number;
}

interface PricingBreakdownProps {
  items: PricingItem[];
  bundlePrice: number;
  totalSavings: number;
}

const PricingBreakdown = ({ items, bundlePrice, totalSavings }: PricingBreakdownProps) => {
  const totalIndividual = items.reduce((sum, item) => sum + item.individualPrice, 0);
  const savingsPercentage = ((totalSavings / totalIndividual) * 100).toFixed(0);

  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
        Pricing Breakdown
      </h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-primary font-medium">{item.platform}</span>
            <span className="font-data text-text-secondary">
              ${item.individualPrice.toFixed(2)}/mo
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-text-primary font-semibold">Individual Total</span>
          <span className="font-data text-text-primary font-semibold">
            ${totalIndividual.toFixed(2)}/mo
          </span>
        </div>
        <div className="flex items-center justify-between py-3 bg-primary/10 rounded-lg px-4">
          <div className="flex items-center gap-2">
            <Icon name="TagIcon" size={20} variant="solid" className="text-primary" />
            <span className="text-primary font-semibold">Bundle Price</span>
          </div>
          <span className="font-data text-primary font-bold text-xl">
            ${bundlePrice.toFixed(2)}/mo
          </span>
        </div>
        <div className="flex items-center justify-between py-3 bg-success/10 rounded-lg px-4">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
            <span className="text-success font-semibold">Your Savings</span>
          </div>
          <div className="text-right">
            <div className="font-data text-success font-bold text-xl">
              ${totalSavings.toFixed(2)}/mo
            </div>
            <div className="text-xs text-success">{savingsPercentage}% off</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBreakdown;