import { supabase } from './supabaseClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export class AuthenticationError extends Error {
  constructor(message: string = 'Not authenticated') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

/**
 * Get the auth token from Supabase session
 */
async function getAuthToken(): Promise<string> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.access_token) {
    throw new AuthenticationError('Please sign in to add items to cart');
  }
  return data.session.access_token;
}

/**
 * Add a bundle to the user's cart
 */
export async function addToCart(bundleId: string): Promise<{ message: string; cartItem: any }> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ bundleId }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthenticationError('Your session has expired. Please sign in again.');
      }
      const error = await response.json();
      throw new Error(error.message || 'Failed to add to cart');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.error('Error adding to cart:', error);
    throw error;
  }
}

/**
 * Remove a bundle from the user's cart
 */
export async function removeFromCart(bundleId: string): Promise<{ message: string }> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ bundleId }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthenticationError('Your session has expired. Please sign in again.');
      }
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove from cart');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Get all items in the user's cart
 */
export async function getCart(): Promise<any[]> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthenticationError('Your session has expired. Please sign in again.');
      }
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch cart');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.error('Error fetching cart:', error);
    throw error;
  }
}
