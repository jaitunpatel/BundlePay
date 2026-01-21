'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

interface UserAuthToggleProps {
  className?: string;
}

const UserAuthToggle = ({ className = '' }: UserAuthToggleProps) => {
  const { loading, userEmail } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return null;

  const isAuthenticated = !!userEmail;
  const displayName = userEmail ? userEmail.split('@')[0] : '';
  const firstLetter = displayName
    ? displayName.charAt(0).toUpperCase()
    : 'U';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await supabase.auth.signOut();
  };

  if (!isAuthenticated) {
    return (
      <Link
        href="/sign-in"
        className={`flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth ${className}`}
      >
        <Icon name="UserIcon" size={20} variant="outline" />
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
          {firstLetter}
        </div>
        <span className="hidden lg:inline text-text-primary font-medium">
          {displayName}
        </span>
        <Icon name="ChevronDownIcon" size={16} variant="outline" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-110"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-64 bg-popover rounded-md shadow-cinematic-lg z-120 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-lg">
                  {firstLetter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {displayName}
                  </p>
                  <p className="text-sm text-text-secondary truncate">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>
                        <div className="py-2">
              <Link
                href="/subscription-management"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
              >
                <Icon name="CreditCardIcon" size={20} variant="outline" />
                <span>My Subscriptions</span>
              </Link>
              <Link
                href="/account-settings"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
              >
                <Icon name="Cog6ToothIcon" size={20} variant="outline" />
                <span>Account Settings</span>
              </Link>
              <Link
                href="/help"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
              >
                <Icon name="QuestionMarkCircleIcon" size={20} variant="outline" />
                <span>Help & Support</span>
              </Link>
            </div>

            <div className="border-t border-border py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-error hover:bg-muted transition-smooth"
              >
                <Icon
                  name="ArrowRightOnRectangleIcon"
                  size={20}
                  variant="outline"
                />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAuthToggle;
