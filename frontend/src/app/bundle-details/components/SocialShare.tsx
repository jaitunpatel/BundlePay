'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SocialShareProps {
  bundleName: string;
  bundleUrl: string;
}

const SocialShare = ({ bundleName, bundleUrl }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: 'ShareIcon',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bundleUrl)}`,
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'Twitter',
      icon: 'ChatBubbleLeftIcon',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(bundleName)}&url=${encodeURIComponent(bundleUrl)}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: 'BriefcaseIcon',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(bundleUrl)}`,
      color: 'hover:text-[#0A66C2]',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bundleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
        Share This Bundle
      </h3>
      <div className="flex flex-wrap gap-3 mb-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 bg-muted text-text-secondary rounded-md transition-smooth ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <Icon name={link.icon as any} size={20} variant="outline" />
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={bundleUrl}
          readOnly
          className="flex-1 px-4 py-2 bg-input border border-border rounded-md text-text-primary text-sm outline-none"
        />
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth whitespace-nowrap"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;