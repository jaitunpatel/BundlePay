'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PromotionalOfferProps {
  title: string;
  description: string;
  discount: number;
  expiresAt: string;
  code: string;
}

const PromotionalOffer = ({
  title,
  description,
  discount,
  expiresAt,
  code,
}: PromotionalOfferProps) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Expired');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-6 border border-accent/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="TagIcon" size={20} variant="solid" className="text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-data font-bold text-accent">{discount}% OFF</div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="ClockIcon" size={16} variant="outline" />
          <span>Expires in {timeLeft}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 px-4 py-2 bg-background rounded-md border border-border">
          <span className="font-data text-text-primary font-medium">{code}</span>
        </div>
        <button
          onClick={handleCopyCode}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default PromotionalOffer;