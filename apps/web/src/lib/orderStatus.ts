/**
 * orderStatus.ts — single source of truth for status transitions and badge styles.
 *
 * The admin status control MUST only offer transitions listed here (PROJECT_PLAN.md § 6).
 */

import type { OrderStatus } from "../types";

// ─── Allowed transitions ──────────────────────────────────────────────────────

export const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

// ─── Badge styling ────────────────────────────────────────────────────────────

export const STATUS_BADGE_CLASSES: Record<OrderStatus, string> = {
  PENDING: "bg-[#f8f8fc] text-[#68677a] border border-[#e7e7ef]",
  CONFIRMED: "bg-[rgba(118,87,225,0.08)] text-[#674ad1]",
  SHIPPED: "bg-[rgba(41,174,162,0.14)] text-[#1e1b35]",
  DELIVERED: "bg-[#674ad1] text-white",
  CANCELLED: "bg-red-50 text-red-700 border border-red-300",
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};
