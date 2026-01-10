import Icon from '@/components/ui/AppIcon';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const BenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      icon: 'CurrencyDollarIcon',
      title: 'Massive Savings',
      description: 'Save up to 40% compared to individual subscriptions. More entertainment, less cost.',
    },
    {
      icon: 'SparklesIcon',
      title: 'Ultimate Convenience',
      description: 'One subscription, one payment, unlimited access to all your favorite platforms.',
    },
    {
      icon: 'RectangleStackIcon',
      title: 'Vast Content Library',
      description: 'Access thousands of movies, shows, sports, and documentaries from 15+ platforms.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Secure & Reliable',
      description: 'Bank-level security with SSL encryption. Cancel anytime with no hidden fees.',
    },
    {
      icon: 'DevicePhoneMobileIcon',
      title: 'Multi-Device Support',
      description: 'Watch on TV, phone, tablet, or computer. Stream anywhere, anytime.',
    },
    {
      icon: 'UserGroupIcon',
      title: 'Family Sharing',
      description: 'Create multiple profiles for family members with personalized recommendations.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Why Choose StreamBundle?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Experience the future of streaming with our comprehensive bundle packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 hover:shadow-cinematic transition-smooth group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                <Icon name={benefit.icon as any} size={28} variant="outline" className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
            Start Saving Today
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Join 50,000+ satisfied users who are already enjoying unlimited entertainment at unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/bundle-catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-medium rounded-md hover:shadow-cinematic transition-smooth"
            >
              <Icon name="RocketLaunchIcon" size={24} variant="outline" />
              <span>Get Started Now</span>
            </a>
            <a
              href="/bundle-catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-md hover:bg-white/20 transition-smooth backdrop-blur-sm"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={24} variant="outline" />
              <span>Talk to Expert</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;