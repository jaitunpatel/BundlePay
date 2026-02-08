'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  platforms: string[];
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );

  const value: CartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    cartCount: cartItems.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
