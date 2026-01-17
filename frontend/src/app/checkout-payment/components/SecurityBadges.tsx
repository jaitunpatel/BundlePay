import Icon from '@/components/ui/AppIcon';

const SecurityBadges = () => {
  const badges = [
    { icon: 'ShieldCheckIcon', text: 'SSL Encrypted' },
    { icon: 'LockClosedIcon', text: 'PCI Compliant' },
    { icon: 'CheckBadgeIcon', text: 'Verified Secure' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <Icon name={badge.icon as any} size={16} variant="solid" className="text-success" />
          <span className="text-xs text-text-secondary font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;