'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { WAITLIST_MODE } from '@/lib/flag';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/components/cart/CartProvider';

interface ShoppingCartIndicatorProps {
  className?: string;
}

export default function ShoppingCartIndicator({
  className = '',
}: ShoppingCartIndicatorProps) {
  if (WAITLIST_MODE) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const { cartItems, cartCount, removeFromCart } = useCart();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || cartCount === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative flex items-center justify-center rounded-md p-2 hover:bg-muted"
        aria-label="Open cart"
      >
        <Icon name="ShoppingCartIcon" size={20} />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {cartCount}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border bg-background shadow-lg z-50">
          <div className="p-4">
            <h4 className="mb-2 font-medium">Your Cart</h4>

            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-sm">{item.name}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-destructive hover:underline"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout"
              className="mt-4 block w-full rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
