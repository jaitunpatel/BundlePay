'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Live Chat', href: '/chat' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Refund Policy', href: '/refunds' },
    ],
    bundles: [
      { label: 'Entertainment', href: '/bundle-catalog?category=entertainment' },
      { label: 'Sports', href: '/bundle-catalog?category=sports' },
      { label: 'Family', href: '/bundle-catalog?category=family' },
      { label: 'International', href: '/bundle-catalog?category=international' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'ShareIcon', href: 'https://facebook.com' },
    { name: 'Twitter', icon: 'ChatBubbleLeftRightIcon', href: 'https://twitter.com' },
    { name: 'Instagram', icon: 'PhotoIcon', href: 'https://instagram.com' },
    { name: 'YouTube', icon: 'PlayIcon', href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Link href="/landing-page" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                  <path d="M12 20L18 14L24 20L30 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 26L18 20L24 26L30 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                StreamBundle
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-4">
              Your one-stop destination for bundled streaming entertainment at unbeatable prices.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} variant="outline" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Bundles</h3>
            <ul className="space-y-3">
              {footerLinks.bundles.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm text-center md:text-left">
              {isHydrated ? `© ${currentYear}` : '© 2026'} StreamBundle. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
                <span className="text-sm text-text-secondary">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="LockClosedIcon" size={20} variant="solid" className="text-success" />
                <span className="text-sm text-text-secondary">PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;