/**
 * money.ts — helpers for displaying PKR amounts stored in paisa.
 *
 * Rules (from PROJECT_PLAN.md § 4):
 *  - Money is ALWAYS stored as integers in paisa (minor units).
 *  - Divide by 100 for display only.
 *  - Never use floats for money, never do arithmetic on formatted strings.
 */

/**
 * Format a paisa amount as a human-readable PKR string.
 *
 * @example formatMoney(150000, "PKR") → "PKR 1,500.00"
 */
export function formatMoney(paisa: number, currency = "PKR"): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(paisa / 100);
}

/** Maximum quantity a customer can order in one go (kept as a named constant). */
export const MAX_ORDER_QTY = 10;
