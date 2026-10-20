/**
 * CheckoutPage — protected route: /checkout
 * Form: shippingName, shippingPhone, shippingAddress, notes (optional)
 * Zod validation mirrors API limits (PROJECT_PLAN.md §6).
 * One Idempotency-Key per attempt; reused on retries.
 * Order summary is labelled ESTIMATE — backend is source of truth.
 */
import { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProduct } from '../hooks/useProduct';
import { formatMoney, MAX_ORDER_QTY } from '../lib/money';
import { fakeOrders } from '../lib/fakeData';

// ─── Zod schema (mirrors API validation) ──────────────────────────────────────

const checkoutSchema = z.object({
  shippingName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  shippingPhone: z
    .string()
    .trim()
    .regex(/^(\+92|0)3\d{9}$/, 'Enter a valid Pakistani phone number (e.g. 03001234567)'),
  shippingAddress: z.string().trim().min(10, 'Address must be at least 10 characters').max(300, 'Address too long'),
  notes: z.string().trim().max(500, 'Notes too long').optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#302e43]">
      {label}
      {children}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: product } = useProduct();

  // Quantity passed from ProductPage via router state
  const initialQty = (location.state as { qty?: number } | null)?.qty ?? 1;
  const qty = Math.min(initialQty, MAX_ORDER_QTY, product?.availableQuantity ?? MAX_ORDER_QTY);

  // One Idempotency-Key per checkout attempt
  const idempotencyKey = useRef(crypto.randomUUID());

  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (_values: CheckoutForm) => {
    setServerError('');
    setSubmitting(true);
    try {
      // TODO: replace with api.post<Order>('/orders', payload, token, { 'Idempotency-Key': idempotencyKey.current })
      await new Promise((r) => setTimeout(r, 800));
      // Simulate a created order by using the first fake order's id
      const createdId = fakeOrders[0].id;
      navigate(`/orders/${createdId}/confirmation`);
    } catch {
      setServerError('Something went wrong. Please try again.');
      // Generate new key only on genuine failure, not double-click
      idempotencyKey.current = crypto.randomUUID();
    } finally {
      setSubmitting(false);
    }
  };

  const estimateMinor = product ? product.priceMinor * qty : 0;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Page header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">
          Almost there
        </p>
        <h1 className="text-[clamp(24px,5vw,34px)] font-extrabold leading-tight tracking-tight text-[#1e1b35]">
          Checkout
        </h1>
        <p className="mt-2 text-[15px] text-[#68677a]">
          Fill in your shipping details and we'll deliver to your door.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-1 flex-col gap-[18px]"
        >
          {serverError && (
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-[10px] border border-red-300 bg-red-50 px-3.5 py-3 text-[13.5px] font-medium text-red-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>{serverError}</span>
            </div>
          )}

          <Field label="Full name" error={errors.shippingName?.message}>
            <input
              {...register('shippingName')}
              type="text"
              placeholder="Ayesha Khan"
              autoComplete="name"
              className={`h-12 w-full rounded-[10px] border bg-white px-3.5 text-[#201e31] outline-none placeholder:text-[#a2a1af] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all duration-150 ${
                errors.shippingName ? 'border-red-300 focus:border-red-400' : 'border-[#d9d8e4] focus:border-[#7657e1]'
              }`}
            />
          </Field>

          <Field label="Phone number" error={errors.shippingPhone?.message}>
            <input
              {...register('shippingPhone')}
              type="tel"
              placeholder="03001234567"
              autoComplete="tel"
              className={`h-12 w-full rounded-[10px] border bg-white px-3.5 text-[#201e31] outline-none placeholder:text-[#a2a1af] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all duration-150 ${
                errors.shippingPhone ? 'border-red-300 focus:border-red-400' : 'border-[#d9d8e4] focus:border-[#7657e1]'
              }`}
            />
          </Field>

          <Field label="Shipping address" error={errors.shippingAddress?.message}>
            <textarea
              {...register('shippingAddress')}
              placeholder="House 12, Street 4, Karachi"
              autoComplete="street-address"
              rows={3}
              className={`w-full rounded-[10px] border bg-white px-3.5 py-3 text-[#201e31] outline-none placeholder:text-[#a2a1af] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all duration-150 resize-none ${
                errors.shippingAddress ? 'border-red-300 focus:border-red-400' : 'border-[#d9d8e4] focus:border-[#7657e1]'
              }`}
            />
          </Field>

          <Field label="Notes (optional)" error={errors.notes?.message}>
            <textarea
              {...register('notes')}
              placeholder="Call before delivery, leave at gate, etc."
              rows={2}
              className="w-full rounded-[10px] border border-[#d9d8e4] bg-white px-3.5 py-3 text-[#201e31] outline-none placeholder:text-[#a2a1af] focus:border-[#7657e1] focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] transition-all duration-150 resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#674ad1] text-[15px] font-bold text-white shadow-[0_9px_18px_rgba(103,74,209,0.22)] transition-all duration-150 hover:bg-[#5639bf] hover:shadow-[0_12px_24px_rgba(103,74,209,0.28)] hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
          >
            {submitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                Placing order…
              </>
            ) : (
              <>Place order <span aria-hidden="true">→</span></>
            )}
          </button>

          <p className="text-center text-xs text-[#68677a]">
            Cash on delivery &middot; No payment needed now
          </p>
        </form>

        {/* Order summary */}
        <aside className="w-full rounded-[18px] border border-[#e7e7ef] bg-white/94 p-6 shadow-[0_24px_60px_rgba(30,28,67,0.06)] sm:w-72 sm:shrink-0 h-fit">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.11em] text-[#7457d9]">
            Order summary
          </p>
          {product ? (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-[#e7e7ef] pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#1e1b35]">{product.name}</p>
                  <p className="text-xs text-[#68677a]">Qty: {qty}</p>
                </div>
                <p className="text-sm font-bold tabular-nums text-[#1e1b35]">
                  {formatMoney(product.priceMinor * qty, product.currency)}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#302e43]">Estimated total</p>
                <p className="text-lg font-extrabold tabular-nums text-[#1e1b35]">
                  {formatMoney(estimateMinor, product.currency)}
                </p>
              </div>
              <p className="mt-2 text-xs text-[#68677a]">
                * This is an estimate. Final total confirmed by our team.
              </p>
              <div className="mt-4 rounded-[10px] bg-[rgba(118,87,225,0.06)] px-3.5 py-3">
                <p className="text-xs font-semibold text-[#674ad1]">💳 Cash on delivery</p>
                <p className="mt-1 text-xs text-[#68677a]">Pay when your order arrives at your door.</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-[#68677a]">Loading…</p>
          )}

          <div className="mt-4">
            <Link to="/" className="text-[13.5px] font-semibold text-[#674ad1] hover:underline hover:text-[#5639bf]">
              ← Back to product
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
