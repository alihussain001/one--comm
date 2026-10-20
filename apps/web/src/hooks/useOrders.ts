/**
 * useOrders / useOrder — TanStack Query hooks for customer order endpoints.
 * Falls back to fake data until the real API is wired.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fakeOrders } from '../lib/fakeData';
import type { Order, Paginated } from '../types';

async function fetchOrders(page = 1, limit = 10): Promise<Paginated<Order>> {
  // TODO: api.get<Paginated<Order>>(`/orders?page=${page}&limit=${limit}`, token)
  await new Promise((r) => setTimeout(r, 400));
  const start = (page - 1) * limit;
  return {
    data: fakeOrders.slice(start, start + limit),
    meta: { page, limit, total: fakeOrders.length, totalPages: Math.ceil(fakeOrders.length / limit) },
  };
}

async function fetchOrder(id: string): Promise<Order> {
  // TODO: api.get<Order>(`/orders/${id}`, token)
  await new Promise((r) => setTimeout(r, 300));
  const order = fakeOrders.find((o) => o.id === id);
  if (!order) throw new Error('ORDER_NOT_FOUND');
  return order;
}

async function cancelOrder(id: string): Promise<Order> {
  // TODO: api.post<Order>(`/orders/${id}/cancel`, {}, token)
  await new Promise((r) => setTimeout(r, 300));
  const order = fakeOrders.find((o) => o.id === id);
  if (!order) throw new Error('ORDER_NOT_FOUND');
  if (order.status !== 'PENDING') throw new Error('ORDER_NOT_CANCELLABLE');
  return { ...order, status: 'CANCELLED' };
}

export function useOrders(page = 1) {
  return useQuery({
    queryKey: ['orders', page],
    queryFn: () => fetchOrders(page),
    placeholderData: (prev) => prev,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
