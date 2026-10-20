/**
 * OrderConfirmationPage — /orders/:id/confirmation
 * Loads GET /orders/:id. Shows order number, status, items, total (server total),
 * shipping details, pay-on-delivery note. Works after a page refresh.
 */
import { Link, useParams } from 'react-router-dom';
import { useOrder } from '../hooks/useOrders';
import StatusBadge from '../components/ui/StatusBadge';
import { formatMoney } from '../lib/money';

export default function OrderConfirmationPage() {
  const { id = '' } = useParams();
  const { data: order, isLoading, isError, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-16 text-sm text-[#68677a]">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#674ad1] border-t-transparent" aria-hidden="true" />
        Loading your order…
      </div>
    );
  }

  if (isError) {
    const msg = (error as Error).message === 'ORDER_NOT_FOUND'
      ? "We couldn't find this order. It may belong to another account."
      : 'Something went wrong loading your order.';
    return (
      <div className="rounded-[18px] border border-red-300 bg-red-50 p-8 text-center">
        <p className="text-[13.5px] font-medium text-red-700">{msg}</p>
        <Link to="/orders" className="mt-4 inline-block text-sm font-bold text-[#674ad1] hover:underline">My orders</Link>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="mx-auto max-w-xl">
      {/* Success header */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(118,87,225,0.1)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#674ad1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Order placed</p>
        <h1 className="text-[clamp(24px,5vw,32px)] font-extrabold tracking-tight text-[#1e1b35]">
          You're all set!
        </h1>
        <p className="text-[15px] text-[#68677a]">
          We've received your order and will confirm it soon.
        </p>
      </div>

      {/* Order card */}
      <div className="rounded-[24px] border border-[#e7e7ef] bg-white/94 p-6 shadow-[0_24px_60px_rgba(30,28,67,0.08)] sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#68677a]">Order number</p>
            <p className="font-bold text-[#1e1b35]">{order.orderNumber}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Items */}
        <div className="mb-5 border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Items</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-semibold text-[#1e1b35]">{item.productName}</p>
                <p className="text-xs text-[#68677a]">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold tabular-nums text-[#1e1b35]">
                {formatMoney(item.unitPriceMinor * item.quantity, order.currency)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-[#e7e7ef] pt-4">
          <p className="font-semibold text-[#302e43]">Total</p>
          <p className="text-xl font-extrabold tabular-nums text-[#1e1b35]">
            {formatMoney(order.totalMinor, order.currency)}
          </p>
        </div>

        {/* Shipping */}
        <div className="mt-5 border-t border-[#e7e7ef] pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Shipping to</p>
          <p className="text-sm font-semibold text-[#1e1b35]">{order.shippingName}</p>
          <p className="text-sm text-[#68677a]">{order.shippingPhone}</p>
          <p className="text-sm text-[#68677a]">{order.shippingAddress}</p>
          {order.notes && (
            <p className="mt-1 text-xs italic text-[#68677a]">Note: {order.notes}</p>
          )}
        </div>

        {/* Pay on delivery note */}
        <div className="mt-5 rounded-[10px] bg-[rgba(118,87,225,0.06)] px-3.5 py-3">
          <p className="text-xs font-semibold text-[#674ad1]">💳 Cash on delivery</p>
          <p className="mt-1 text-xs text-[#68677a]">Have the exact amount ready when your order arrives.</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link
          to="/orders"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-[#d9d8e4] bg-white px-5 text-sm font-bold text-[#201e31] transition-colors hover:border-[#674ad1] hover:text-[#674ad1]"
        >
          My orders
        </Link>
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] bg-[#674ad1] px-5 text-sm font-bold text-white shadow-[0_9px_18px_rgba(103,74,209,0.22)] transition-all hover:bg-[#5639bf]"
        >
          Back to store
        </Link>
      </div>
    </div>
  );
}
