"use client";

import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getCart as fetchCart, addToCart as addToCartApi, removeFromCart as removeFromCartApi, AuthenticationError } from "@/lib/cartApi";

export type CartItem = {
  id: string;
  userId: string;
  bundleId: string;
  bundle?: {
    id: string;
    name: string;
    bundlePrice: number;
    [key: string]: any;
  };
  createdAt?: string;
  [key: string]: any;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (bundleId: string) => Promise<CartItem>;
  removeFromCart: (bundleId: string) => Promise<void>;
  clearError: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { userEmail } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const fetchCartItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await fetchCart();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch cart';
      // Don't show error for auth errors on initial load
      if (!(err instanceof AuthenticationError)) {
        setError(message);
      }
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart on mount when user is authenticated
  useEffect(() => {
    // Mark as hydrated on client side
    setIsHydrated(true);
    
    if (userEmail) {
      fetchCartItems();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [userEmail, fetchCartItems]);

  const handleAddToCart = useCallback(async (bundleId: string) => {
    try {
      setError(null);
      const result = await addToCartApi(bundleId);
      
      // Refresh cart after adding
      await fetchCartItems();
      
      return result.cartItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add to cart';
      setError(message);
      throw err;
    }
  }, [fetchCartItems]);

  const handleRemoveFromCart = useCallback(async (bundleId: string) => {
    try {
      setError(null);
      await removeFromCartApi(bundleId);
      
      // Refresh cart after removing
      await fetchCartItems();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove from cart';
      setError(message);
      throw err;
    }
  }, [fetchCartItems]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: isHydrated ? cartItems : [],
        cartCount: isHydrated ? cartItems.length : 0,
        loading,
        error,
        fetchCart: fetchCartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
