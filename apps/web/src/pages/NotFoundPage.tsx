/** NotFoundPage — catch-all 404 route. */
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      {/* Big 404 */}
      <p className="text-[clamp(80px,18vw,140px)] font-extrabold leading-none tracking-tight text-[rgba(103,74,209,0.12)] select-none" aria-hidden="true">
        404
      </p>
      <div className="-mt-6">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">
          Page not found
        </p>
        <h1 className="text-[clamp(22px,4vw,28px)] font-extrabold tracking-tight text-[#1e1b35]">
          Nothing here
        </h1>
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[#68677a]">
          The page you're looking for doesn't exist or may have moved.
        </p>
      </div>
      <Link
        to="/"
        className="mt-2 inline-flex min-h-[46px] items-center gap-2 rounded-[10px] bg-[#674ad1] px-6 text-[15px] font-bold text-white shadow-[0_9px_18px_rgba(103,74,209,0.22)] transition-all hover:bg-[#5639bf] hover:-translate-y-px"
      >
        ← Back to store
      </Link>
    </div>
  );
}
