import { supabase } from './supabaseClient';
import { AuthenticationError } from './cartApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

type CreateBundlePayload = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string | null;
  bundleType?: number;
  serviceIds: string[];
};

async function getAuthToken(): Promise<string> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.access_token) {
    throw new AuthenticationError('Please sign in to create a bundle');
  }
  return data.session.access_token;
}

export async function createBundle(payload: CreateBundlePayload): Promise<boolean> {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/bundles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      imageUrl: payload.imageUrl ?? null,
      bundleType: payload.bundleType ?? 1,
      serviceIds: payload.serviceIds,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthenticationError('Your session has expired. Please sign in again.');
    }

    let message = 'Failed to create bundle';
    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      // Fallback to default message
    }
    throw new Error(message);
  }

  return true;
}
