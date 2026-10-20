/** StatusBadge — colour-coded pill for OrderStatus values.
 *
 *  Styling is driven by STATUS_BADGE_CLASSES (single source of truth in lib/orderStatus.ts).
 */

import type { OrderStatus } from "../../types";
import { STATUS_BADGE_CLASSES, STATUS_LABELS } from "../../lib/orderStatus";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_BADGE_CLASSES[status]} ${className}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
