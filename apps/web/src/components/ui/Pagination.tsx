/** Pagination controls — previous / next with page info text. */

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  isFetching?: boolean;
}

export default function Pagination({ page, totalPages, onPageChange, isFetching }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      <span className="text-sm text-[#68677a]">
        Page {page} of {totalPages}
        {isFetching && <span className="ml-2 text-xs text-[#7457d9]">Updating…</span>}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex h-9 min-w-[80px] items-center justify-center rounded-[10px] border border-[#d9d8e4] bg-white text-sm font-semibold text-[#302e43] transition-colors hover:border-[#674ad1] hover:text-[#674ad1] disabled:opacity-40 disabled:pointer-events-none"
        >
          ← Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex h-9 min-w-[80px] items-center justify-center rounded-[10px] border border-[#d9d8e4] bg-white text-sm font-semibold text-[#302e43] transition-colors hover:border-[#674ad1] hover:text-[#674ad1] disabled:opacity-40 disabled:pointer-events-none"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
