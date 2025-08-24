// src/lib/api.ts
import { Order } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined. Please check your .env file.");
}

/**
 * Fetches the list of orders that are available to be assigned.
 * @returns A promise that resolves to an array of assignable orders.
 */
export const fetchAssignableOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/deliveries/assignable`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(errorData.message || 'Failed to fetch orders');
  }
  return response.json();
};
