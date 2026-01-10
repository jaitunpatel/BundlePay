import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface RelatedBundle {
  id: string;
  name: string;
  price: number;
  platforms: string[];
  savings: number;
}

interface RelatedBundlesProps {
  bundles: RelatedBundle[];
}

const RelatedBundles = ({ bundles }: RelatedBundlesProps) => {
  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
        Related Bundles
      </h3>
      <div className="space-y-4">
        {bundles.map((bundle) => (
          <Link
            key={bundle.id}
            href={`/bundle-details?id=${bundle.id}`}
            className="block bg-muted rounded-lg p-4 hover:shadow-cinematic transition-smooth"
          >
            <h4 className="font-medium text-text-primary mb-2">{bundle.name}</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {bundle.platforms.slice(0, 3).map((platform, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-background rounded text-text-secondary">
                  {platform}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-data text-primary font-semibold">
                ${bundle.price.toFixed(2)}/mo
              </span>
              <span className="flex items-center gap-1 text-xs text-success">
                <Icon name="CheckCircleIcon" size={14} variant="solid" />
                Save ${bundle.savings.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBundles;