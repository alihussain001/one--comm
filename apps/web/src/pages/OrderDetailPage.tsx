/**
 * OrderDetailPage — /orders/:id (ProtectedRoute)
 * Shows a single customer order. Cancel button shown only for PENDING orders,
 * behind a ConfirmDialog.
 */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrder, useCancelOrder } from '../hooks/useOrders';
import StatusBadge from '../components/ui/StatusBadge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { formatMoney } from '../lib/money';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-PK', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso));
}

export default function OrderDetailPage() {
  const { id = '' } = useParams();
  const { data: order, isLoading, isError, error } = useOrder(id);
  const cancelMutation = useCancelOrder();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const handleCancel = async () => {
    setDialogOpen(false);
    setCancelError('');
    try {
      await cancelMutation.mutateAsync(id);
    } catch (e) {
      const msg = (e as Error).message;
      setCancelError(
        msg === 'ORDER_NOT_CANCELLABLE'
          ? 'This order can no longer be cancelled.'
          : 'Something went wrong. Please try again.',
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-16 text-sm text-[#68677a]">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#674ad1] border-t-transparent" aria-hidden="true" />
        Loading order…
      </div>
    );
  }

  if (isError) {
    const msg =
      (error as Error).message === 'ORDER_NOT_FOUND'
        ? "We couldn't find this order."
        : 'Something went wrong.';
    return (
      <div className="rounded-[18px] border border-red-300 bg-red-50 p-8 text-center">
        <p className="text-[13.5px] font-medium text-red-700">{msg}</p>
        <Link to="/orders" className="mt-4 inline-block text-sm font-bold text-[#674ad1] hover:underline">← Back to orders</Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="mx-auto max-w-xl">
      {/* Breadcrumb */}
      <Link to="/orders" className="mb-6 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#674ad1] hover:underline">
        ← My orders
      </Link>

      {/* Cancel error */}
      {cancelError && (
        <div role="alert" className="mt-4 mb-2 flex items-center gap-2.5 rounded-[10px] border border-red-300 bg-red-50 px-3.5 py-3 text-[13.5px] font-medium text-red-700">
          {cancelError}
        </div>
      )}

      <div className="mt-4 rounded-[24px] border border-[#e7e7ef] bg-white/94 p-6 shadow-[0_24px_60px_rgba(30,28,67,0.08)] sm:p-8">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-[#68677a]">Order number</p>
            <p className="font-bold text-[#1e1b35]">{order.orderNumber}</p>
            <p className="mt-1 text-xs text-[#68677a]">Placed {formatDate(order.createdAt)}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Items */}
        <div className="border-t border-[#e7e7ef] pt-5">
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
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-[#e7e7ef] py-4">
          <p className="font-semibold text-[#302e43]">Total</p>
          <p className="text-xl font-extrabold tabular-nums text-[#1e1b35]">{formatMoney(order.totalMinor, order.currency)}</p>
        </div>

        {/* Shipping */}
        <div className="border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Shipping</p>
          <p className="text-sm font-semibold text-[#1e1b35]">{order.shippingName}</p>
          <p className="text-sm text-[#68677a]">{order.shippingPhone}</p>
          <p className="text-sm text-[#68677a]">{order.shippingAddress}</p>
          {order.notes && <p className="mt-1 text-xs italic text-[#68677a]">Note: {order.notes}</p>}
        </div>

        {/* Cancel button — PENDING only */}
        {order.status === 'PENDING' && (
          <div className="mt-6 border-t border-[#e7e7ef] pt-5">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              disabled={cancelMutation.isPending}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-red-300 bg-red-50 px-5 text-sm font-bold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60 disabled:pointer-events-none"
            >
              {cancelMutation.isPending ? 'Cancelling…' : 'Cancel order'}
            </button>
            <p className="mt-2 text-xs text-[#68677a]">You can only cancel while your order is Pending.</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={dialogOpen}
        title="Cancel this order?"
        message="This action cannot be undone. Your order will be cancelled and stock returned."
        confirmLabel="Yes, cancel"
        cancelLabel="Keep order"
        danger
        onConfirm={handleCancel}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}
