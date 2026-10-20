/**
 * useProduct — TanStack Query hook for GET /product.
 * Falls back to fake data until the real API is wired.
 */
import { useQuery } from '@tanstack/react-query';
import { fakeProduct } from '../lib/fakeData';
import type { Product } from '../types';

async function fetchProduct(): Promise<Product> {
  // TODO: replace with api.get<Product>('/product') once API is ready
  await new Promise((r) => setTimeout(r, 400)); // simulate network
  return fakeProduct;
}

export function useProduct() {
  return useQuery({
    queryKey: ['product'],
    queryFn: fetchProduct,
    staleTime: 60_000,
  });
}
