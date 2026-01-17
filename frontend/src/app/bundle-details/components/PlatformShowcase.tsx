import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Platform {
  name: string;
  logo: string;
  logoAlt: string;
  individualPrice: number;
  description: string;
  keyContent: string[];
}

interface PlatformShowcaseProps {
  platforms: Platform[];
}

const PlatformShowcase = ({ platforms }: PlatformShowcaseProps) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
        Included Platforms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, idx) => (
          <div
            key={idx}
            className="bg-muted rounded-lg p-5 hover:shadow-cinematic transition-smooth"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-background rounded-lg overflow-hidden flex items-center justify-center p-2">
                <AppImage
                  src={platform.logo}
                  alt={platform.logoAlt}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-data text-text-secondary text-sm">
                ${platform.individualPrice.toFixed(2)}/mo
              </span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              {platform.name}
            </h3>
            <p className="text-sm text-text-secondary mb-3">{platform.description}</p>
            <div className="space-y-1">
              {platform.keyContent.map((content, contentIdx) => (
                <div key={contentIdx} className="flex items-center gap-2">
                  <Icon
                    name="CheckIcon"
                    size={14}
                    variant="outline"
                    className="text-success flex-shrink-0"
                  />
                  <span className="text-xs text-text-primary">{content}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformShowcase;