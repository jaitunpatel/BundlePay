'use client';

import { useState } from 'react';
import { WAITLIST_MODE } from "@/lib/flag";
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ShoppingCartIndicator from '@/components/common/ShoppingCartIndicator';
import UserAuthToggle from '@/components/common/UserAuthToggle';
import SearchInterface from '@/components/common/SearchInterface';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/landing-page');

  const navigationItems = [
    { label: 'Bundles', path: '/bundle-catalog', icon: 'RectangleStackIcon' },
    { label: 'My Subscriptions', path: '/subscription-management', icon: 'CreditCardIcon', requiresAuth: true },
  ].filter((item) => {
    if (!WAITLIST_MODE) return true;
    return item.path !== '/subscription-management';
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path: string) => {
    setActiveRoute(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-100 bg-card shadow-cinematic ${className}`}>
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link 
            href="/landing-page" 
            className="flex items-center gap-3 transition-smooth hover:opacity-80"
            onClick={() => handleNavClick('/landing-page')}
          >
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
            <span className="text-xl font-heading font-semibold text-text-primary hidden sm:block">
              StreamBundle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth font-medium ${
                  activeRoute === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={20} variant="outline" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <div className="hidden lg:block">
              <SearchInterface />
            </div>

            {/* Shopping Cart */}
            <ShoppingCartIndicator />

            {/* User Auth */}
            <UserAuthToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} variant="outline" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-3 space-y-1">
              {/* Search - Mobile */}
              <div className="mb-3">
                <SearchInterface />
              </div>

              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-smooth font-medium ${
                    activeRoute === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;