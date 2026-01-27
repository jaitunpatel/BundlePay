'use client';

import { useState } from 'react';
import { WAITLIST_MODE } from "@/lib/flag";
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  platforms: string[];
}

interface ShoppingCartIndicatorProps {
  className?: string;
}

const ShoppingCartIndicator = ({ className = '' }: ShoppingCartIndicatorProps) => {
  if (WAITLIST_MODE) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Entertainment Plus Bundle',
      price: 29.99,
      platforms: ['Netflix', 'Disney+', 'Hulu'],
    },
  ]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleCart}
        className="relative p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        <Icon name="ShoppingCartIcon" size={24} variant="outline" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-110"
            onClick={toggleCart}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-80 bg-popover rounded-md shadow-cinematic-lg z-120 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Shopping Cart
              </h3>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="ShoppingCartIcon" size={48} variant="outline" className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-text-secondary">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-border hover:bg-muted transition-smooth">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-text-primary">{item.name}</h4>
                        <button
                          className="text-text-secondary hover:text-error transition-smooth"
                          aria-label="Remove item"
                        >
                          <Icon name="XMarkIcon" size={18} variant="outline" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.platforms.slice(0, 3).map((platform, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-muted rounded text-text-secondary">
                            {platform}
                          </span>
                        ))}
                      </div>
                      <p className="font-data text-primary font-medium">${item.price.toFixed(2)}/mo</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-secondary">Total</span>
                    <span className="text-xl font-data font-semibold text-text-primary">
                      ${cartTotal.toFixed(2)}/mo
                    </span>
                  </div>
                  <Link
                    href="/checkout-payment"
                    onClick={toggleCart}
                    className="block w-full py-3 px-4 bg-primary text-primary-foreground text-center font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartIndicator;