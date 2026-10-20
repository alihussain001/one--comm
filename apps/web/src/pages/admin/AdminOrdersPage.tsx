/**
 * AdminOrdersPage — /admin/orders (AdminRoute)
 * Table of ALL orders. Filterable by status, searchable by order number, paginated.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/ui/StatusBadge';
import Pagination from '../../components/ui/Pagination';
import { formatMoney } from '../../lib/money';
import { fakeAdminOrders } from '../../lib/fakeData';
import type { OrderStatus } from '../../types';

const ALL_STATUSES: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium' }).format(new Date(iso));
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Client-side filter (swap for api.get('/admin/orders?...') later)
  const filtered = fakeAdminOrders.filter((o) => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  const handleStatusChange = (v: string) => {
    setStatusFilter(v as OrderStatus | '');
    setPage(1);
  };
  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">Admin</p>
        <h1 className="text-[clamp(24px,5vw,34px)] font-extrabold tracking-tight text-[#1e1b35]">All Orders</h1>
        <p className="mt-1 text-[15px] text-[#68677a]">
          {filtered.length} order{filtered.length !== 1 ? 's' : ''}{statusFilter ? ` · ${statusFilter}` : ''}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search order number…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-12 flex-1 rounded-[10px] border border-[#d9d8e4] bg-white px-3.5 text-[#201e31] outline-none placeholder:text-[#a2a1af] focus:border-[#7657e1] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all"
        />
        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="h-12 rounded-[10px] border border-[#d9d8e4] bg-white px-3.5 text-[#201e31] outline-none focus:border-[#7657e1] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all sm:w-48"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-[10px] border border-[#e7e7ef] bg-white/94">
        <table className="w-full" aria-label="All orders">
          <thead>
            <tr className="bg-[#f8f8fc]">
              {['Order', 'Customer', 'Date', 'Total', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#68677a]">
                  No orders match your filters.
                </td>
              </tr>
            ) : (
              paginated.map((order) => (
                <tr key={order.id} className="hover:bg-[rgba(118,87,225,0.04)] transition-colors">
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm font-semibold text-[#201e31] whitespace-nowrap">{order.orderNumber}</td>
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm text-[#68677a]">
                    <p className="font-semibold text-[#201e31]">{order.customer.name}</p>
                    <p className="text-xs">{order.customer.email}</p>
                  </td>
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm text-[#68677a] whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef] text-sm tabular-nums font-semibold text-[#201e31]">{formatMoney(order.totalMinor, order.currency)}</td>
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef]"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3.5 border-t border-[#e7e7ef]">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-[13.5px] font-semibold text-[#674ad1] hover:underline hover:text-[#5639bf]"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
