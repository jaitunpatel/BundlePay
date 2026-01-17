import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

const TrustSignalsSection = () => {
  const trustSignals: TrustSignal[] = [
  {
    icon: 'ShieldCheckIcon',
    title: 'SSL Encrypted',
    description: 'Bank-level security for all transactions'
  },
  {
    icon: 'LockClosedIcon',
    title: 'Secure Payments',
    description: 'PCI DSS compliant payment processing'
  },
  {
    icon: 'CheckBadgeIcon',
    title: 'Verified Platform',
    description: 'Official partnerships with all providers'
  },
  {
    icon: 'ClockIcon',
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance'
  }];


  const partners: Partner[] = [
  {
    name: 'Netflix',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc6e4642-1767992352043.png",
    alt: 'Netflix official partner logo with red branding'
  },
  {
    name: 'Disney+',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0d84610-1767992351114.png",
    alt: 'Disney Plus official partner logo with blue star'
  },
  {
    name: 'Amazon Prime',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_130164115-1767992351899.png",
    alt: 'Amazon Prime Video official partner logo'
  },
  {
    name: 'HBO Max',
    logo: "https://images.unsplash.com/photo-1662391253789-e1e29916fa86",
    alt: 'HBO Max official partner logo with purple gradient'
  },
  {
    name: 'Hulu',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1aac4e1b3-1767992350740.png",
    alt: 'Hulu official partner logo in green'
  },
  {
    name: 'ESPN+',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c8a0a18a-1767992352305.png",
    alt: 'ESPN Plus official partner logo with sports branding'
  }];


  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your security and satisfaction are our top priorities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustSignals.map((signal, index) =>
          <div
            key={index}
            className="bg-background rounded-lg p-6 text-center hover:shadow-cinematic transition-smooth">

              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={signal.icon as any} size={24} variant="solid" className="text-success" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                {signal.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {signal.description}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-12">
          <h3 className="text-xl font-heading font-semibold text-text-primary text-center mb-8">
            Official Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner) =>
            <div
              key={partner.name}
              className="bg-background rounded-lg p-4 flex items-center justify-center hover:shadow-cinematic transition-smooth grayscale hover:grayscale-0">

                <div className="w-full h-12 relative">
                  <AppImage
                  src={partner.logo}
                  alt={partner.alt}
                  className="w-full h-full object-contain" />

                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-muted rounded-xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
          </div>
          <p className="text-2xl font-heading font-bold text-text-primary mb-2">
            4.8 out of 5 stars
          </p>
          <p className="text-text-secondary">
            Based on 12,500+ verified customer reviews
          </p>
        </div>
      </div>
    </section>);

};

export default TrustSignalsSection;