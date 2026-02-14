'use client';

import { useState, useEffect, useMemo } from 'react';
import { WAITLIST_MODE } from "@/lib/flag";
import { useCart } from '@/components/cart/CartProvider';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface ShoppingCartIndicatorProps {
  className?: string;
}

const ShoppingCartIndicator = ({ className = '' }: ShoppingCartIndicatorProps) => {
  if (WAITLIST_MODE) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { cartItems, cartCount, removeFromCart } = useCart();

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const bundlePrice =
          typeof item.bundle?.bundlePrice === 'number'
            ? item.bundle.bundlePrice
            : typeof item.bundle?.price === 'number'
              ? item.bundle.price
              : 0;
        return sum + bundlePrice;
      }, 0),
    [cartItems]
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
        {isHydrated && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-accent-foreground rounded-full shadow-depth">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && isHydrated && (
        <>
          <div
            className="fixed inset-0 z-110 bg-background/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed top-0 right-0 h-screen w-full max-w-[400px] z-120 bg-card border-l border-border shadow-cinematic-xl flex flex-col">
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    Bundle Cart
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {cartCount} bundle{cartCount === 1 ? '' : 's'} selected
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
                  aria-label="Close cart"
                >
                  <Icon name="XMarkIcon" size={22} variant="outline" />
                </button>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-1 p-6 text-center flex flex-col justify-center">
                <Icon name="ShoppingCartIcon" size={52} variant="outline" className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-text-secondary">Your cart is empty</p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-5 py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cartItems.map((item) => {
                    const bundleName = item.bundle?.name || 'Bundle';
                    const bundlePrice =
                      typeof item.bundle?.bundlePrice === 'number'
                        ? item.bundle.bundlePrice
                        : typeof item.bundle?.price === 'number'
                          ? item.bundle.price
                          : 0;

                    return (
                      <div key={item.id} className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex justify-between items-start gap-3">
                          <div className="min-w-0">
                            <h4 className="font-medium text-text-primary truncate">{bundleName}</h4>
                            <p className="font-data text-primary font-semibold mt-1">${bundlePrice.toFixed(2)}/mo</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.bundleId)}
                            className="text-text-secondary hover:text-error transition-smooth p-1 -mr-1"
                            aria-label="Remove item"
                          >
                            <Icon name="XMarkIcon" size={18} variant="outline" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-5 border-t border-border bg-card/95 backdrop-blur">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-2xl font-data font-bold text-text-primary">
                      ${subtotal.toFixed(2)}/mo
                    </span>
                  </div>
                  <Link
                    href="/checkout-payment"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 px-4 bg-primary text-primary-foreground text-center font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 block w-full text-center text-sm text-text-secondary hover:text-text-primary transition-smooth"
                  >
                    Continue browsing
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}
    </div>
  );
};

export default ShoppingCartIndicator;
