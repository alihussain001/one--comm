/**
 * AdminOrderDetailPage — /admin/orders/:id (AdminRoute)
 * Full order detail + customer summary + status control.
 * Status dropdown only offers ALLOWED_TRANSITIONS for the current status.
 */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatMoney } from '../../lib/money';
import { ALLOWED_TRANSITIONS, STATUS_LABELS } from '../../lib/orderStatus';
import { fakeAdminOrders } from '../../lib/fakeData';
import type { OrderStatus } from '../../types';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-PK', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso));
}

export default function AdminOrderDetailPage() {
  const { id = '' } = useParams();

  // TODO: replace with useQuery for api.get<AdminOrderDetail>(`/admin/orders/${id}`, token)
  const order = fakeAdminOrders.find((o) => o.id === id) ?? null;

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status ?? 'PENDING');
  const [statusError, setStatusError] = useState('');
  const [statusSuccess, setStatusSuccess] = useState('');
  const [updating, setUpdating] = useState(false);
  const [nextStatus, setNextStatus] = useState<OrderStatus | ''>('');

  if (!order) {
    return (
      <div className="rounded-[18px] border border-red-300 bg-red-50 p-8 text-center">
        <p className="text-[13.5px] font-medium text-red-700">Order not found.</p>
        <Link to="/admin/orders" className="mt-4 inline-block text-sm font-bold text-[#674ad1] hover:underline">← All orders</Link>
      </div>
    );
  }

  const allowedNext = ALLOWED_TRANSITIONS[currentStatus];

  const handleStatusUpdate = async () => {
    if (!nextStatus) return;
    setStatusError('');
    setStatusSuccess('');
    setUpdating(true);
    try {
      // TODO: await api.patch(`/admin/orders/${id}/status`, { status: nextStatus }, token)
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStatus(nextStatus as OrderStatus);
      setStatusSuccess(`Status updated to ${STATUS_LABELS[nextStatus as OrderStatus]}.`);
      setNextStatus('');
    } catch {
      setStatusError('Failed to update status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/admin/orders" className="mb-6 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#674ad1] hover:underline">
        ← All orders
      </Link>

      <div className="mt-4 rounded-[24px] border border-[#e7e7ef] bg-white/94 p-6 shadow-[0_24px_60px_rgba(30,28,67,0.08)] sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Admin · Order detail</p>
            <h1 className="mt-1 text-xl font-extrabold text-[#1e1b35]">{order.orderNumber}</h1>
            <p className="mt-1 text-xs text-[#68677a]">Placed {formatDate(order.createdAt)}</p>
          </div>
          <StatusBadge status={currentStatus} />
        </div>

        {/* Customer */}
        <div className="mb-6 rounded-[14px] bg-[#f8f8fc] px-4 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Customer</p>
          <p className="text-sm font-semibold text-[#1e1b35]">{order.customer.name}</p>
          <p className="text-sm text-[#68677a]">{order.customer.email}</p>
        </div>

        {/* Items */}
        <div className="mb-6 border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Items</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-semibold text-[#1e1b35]">{item.productName}</p>
                <p className="text-xs text-[#68677a]">{formatMoney(item.unitPriceMinor, order.currency)} × {item.quantity}</p>
              </div>
              <p className="text-sm font-bold tabular-nums text-[#1e1b35]">
                {formatMoney(item.unitPriceMinor * item.quantity, order.currency)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-[#e7e7ef] pt-3 mt-2">
            <p className="font-semibold text-[#302e43]">Total</p>
            <p className="text-lg font-extrabold tabular-nums text-[#1e1b35]">{formatMoney(order.totalMinor, order.currency)}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="mb-6 border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Shipping</p>
          <p className="text-sm font-semibold text-[#1e1b35]">{order.shippingName}</p>
          <p className="text-sm text-[#68677a]">{order.shippingPhone}</p>
          <p className="text-sm text-[#68677a]">{order.shippingAddress}</p>
          {order.notes && <p className="mt-1 text-xs italic text-[#68677a]">Note: {order.notes}</p>}
        </div>

        {/* Status control */}
        <div className="border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Update status</p>

          {statusError && (
            <div role="alert" className="mb-3 flex items-center gap-2.5 rounded-[10px] border border-red-300 bg-red-50 px-3.5 py-3 text-[13.5px] font-medium text-red-700">
              {statusError}
            </div>
          )}
          {statusSuccess && (
            <div role="status" className="mb-3 flex items-center gap-2.5 rounded-[10px] bg-[rgba(41,174,162,0.12)] px-3.5 py-3 text-[13.5px] font-medium text-[#1e1b35]">
              ✓ {statusSuccess}
            </div>
          )}

          {allowedNext.length === 0 ? (
            <p className="text-sm text-[#68677a]">
              This order is in a final state ({STATUS_LABELS[currentStatus]}) and cannot be updated further.
            </p>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value as OrderStatus)}
                className="h-12 flex-1 rounded-[10px] border border-[#d9d8e4] bg-white px-3.5 text-[#201e31] outline-none focus:border-[#7657e1] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all"
              >
                <option value="">Select next status…</option>
                {allowedNext.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={!nextStatus || updating}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#674ad1] px-6 text-sm font-bold text-white shadow-[0_9px_18px_rgba(103,74,209,0.22)] transition-all hover:bg-[#5639bf] disabled:opacity-60 disabled:pointer-events-none"
              >
                {updating ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                    Updating…
                  </>
                ) : 'Update →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
