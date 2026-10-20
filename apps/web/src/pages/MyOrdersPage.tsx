/**
 * MyOrdersPage — /orders (ProtectedRoute)
 * Paginated list of the caller's own orders.
 * Keeps previous page data visible while the next page loads.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import { formatMoney } from '../lib/money';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium' }).format(new Date(iso));
}

export default function MyOrdersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useOrders(page);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Account</p>
        <h1 className="text-[clamp(24px,5vw,34px)] font-extrabold tracking-tight text-[#1e1b35]">My Orders</h1>
        <p className="mt-1 text-[15px] text-[#68677a]">Track and manage your One-Comm orders.</p>
      </div>

      {/* Loading first load */}
      {isLoading && (
        <div className="flex items-center gap-3 py-12 text-sm text-[#68677a]">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#674ad1] border-t-transparent" aria-hidden="true" />
          Loading orders…
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-[18px] border border-red-300 bg-red-50 px-5 py-4 text-[13.5px] font-medium text-red-700">
          Unable to load your orders. Please try again.
        </div>
      )}

      {/* Table */}
      {data && (
        <>
          {data.data.length === 0 ? (
            <div className="rounded-[18px] border border-[#e7e7ef] bg-white/94 px-6 py-12 text-center">
              <p className="text-sm text-[#68677a]">You haven't placed any orders yet.</p>
              <Link to="/" className="mt-3 inline-block text-sm font-bold text-[#674ad1] hover:underline">Shop now →</Link>
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-[10px] border border-[#e7e7ef] bg-white/94">
              <table className="w-full" aria-label="My orders">
                <thead>
                  <tr className="bg-[#f8f8fc]">
                    {['Order', 'Date', 'Total', 'Status', ''].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((order) => (
                    <tr key={order.id} className="hover:bg-[rgba(118,87,225,0.04)] transition-colors">
                      <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm font-semibold text-[#201e31]">{order.orderNumber}</td>
                      <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm text-[#68677a]">{formatDate(order.createdAt)}</td>
                      <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm tabular-nums font-semibold text-[#201e31]">{formatMoney(order.totalMinor, order.currency)}</td>
                      <td className="px-4 py-3.5 border-t border-[#e7e7ef]"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3.5 border-t border-[#e7e7ef]">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-[13.5px] font-semibold text-[#674ad1] hover:underline hover:text-[#5639bf]"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            onPageChange={setPage}
            isFetching={isFetching}
          />
        </>
      )}
    </div>
  );
}
