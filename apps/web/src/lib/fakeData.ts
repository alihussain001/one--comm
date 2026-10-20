/**
 * fakeData.ts — typed fake data matching docs/TYPES.md shapes exactly.
 *
 * Swap `fakeProduct` / `fakeOrders` calls for real API calls (via api.ts)
 * without changing any screen component — the types are identical.
 */

import type { Product, Order, AdminOrderDetail } from "../types";

// ─── Product ──────────────────────────────────────────────────────────────────

export const fakeProduct: Product = {
  id: "e1b2c3d4-1111-4aaa-8bbb-cccdddeeefff",
  slug: "one-comm-wireless-earbuds",
  name: "One-Comm Wireless Earbuds",
  description:
    "Crystal-clear audio engineered for the way you communicate. One-Comm Wireless Earbuds deliver 30-hour battery life, active noise cancellation, and an ergonomic fit designed for all-day comfort — whether you're on a call, in a meeting, or just listening to music.",
  priceMinor: 150000, // PKR 1,500.00
  currency: "PKR",
  imageUrl: null, // will show placeholder
  inStock: true,
  availableQuantity: 47,
};

// ─── Customer Orders ──────────────────────────────────────────────────────────

export const fakeOrders: Order[] = [
  {
    id: "7c2a1f4e-9b3d-4e8a-a1c0-12d4e6f890ab",
    orderNumber: "OC20261015-0001",
    status: "PENDING",
    totalMinor: 300000,
    currency: "PKR",
    shippingName: "Ayesha Khan",
    shippingPhone: "+923001234567",
    shippingAddress: "House 12, Street 4, Karachi",
    notes: "Call before delivery",
    items: [
      {
        id: "a11b22c3-d44e-4f55-a666-777888999000",
        productId: "e1b2c3d4-1111-4aaa-8bbb-cccdddeeefff",
        productName: "One-Comm Wireless Earbuds",
        quantity: 2,
        unitPriceMinor: 150000,
      },
    ],
    createdAt: "2026-10-15T05:37:00.000Z",
    updatedAt: "2026-10-15T05:37:00.000Z",
  },
  {
    id: "8d3b2e5f-0c4e-5f9b-b2d1-23e5f7a901bc",
    orderNumber: "OC-20261016-7K3QX9",
    status: "CONFIRMED",
    totalMinor: 150000,
    currency: "PKR",
    shippingName: "Bilal Ahmed",
    shippingPhone: "03011234567",
    shippingAddress: "Flat 3B, Block C, DHA Phase 5, Lahore",
    notes: null,
    items: [
      {
        id: "b22c33d4-e55f-4666-b777-888999000111",
        productId: "e1b2c3d4-1111-4aaa-8bbb-cccdddeeefff",
        productName: "One-Comm Wireless Earbuds",
        quantity: 1,
        unitPriceMinor: 150000,
      },
    ],
    createdAt: "2026-10-16T09:12:00.000Z",
    updatedAt: "2026-10-16T11:40:00.000Z",
  },
  {
    id: "9e4c3f60-1d5f-60ac-c3e2-34f608ba12cd",
    orderNumber: "OC20261017-0008",
    status: "SHIPPED",
    totalMinor: 450000,
    currency: "PKR",
    shippingName: "Sana Malik",
    shippingPhone: "+923331112233",
    shippingAddress: "Shop 18, Super Market, F-6, Islamabad",
    notes: "Leave with the shopkeeper if closed",
    items: [
      {
        id: "c33d44e5-f667-4777-c888-999000111222",
        productId: "e1b2c3d4-1111-4aaa-8bbb-cccdddeeefff",
        productName: "One-Comm Wireless Earbuds",
        quantity: 3,
        unitPriceMinor: 150000,
      },
    ],
    createdAt: "2026-10-17T14:05:00.000Z",
    updatedAt: "2026-10-18T08:20:00.000Z",
  },
  {
    id: "af5d4071-2e60-71bd-d4f3-450719cb23de",
    orderNumber: "OC-20261018-M9P2LW",
    status: "CANCELLED",
    totalMinor: 150000,
    currency: "PKR",
    shippingName: "Omar Farooq",
    shippingPhone: "03219876543",
    shippingAddress: "House 44, Canal View, Peshawar",
    notes: null,
    items: [
      {
        id: "d44e55f6-0778-4888-d999-000111222333",
        productId: "e1b2c3d4-1111-4aaa-8bbb-cccdddeeefff",
        productName: "One-Comm Wireless Earbuds",
        quantity: 1,
        unitPriceMinor: 150000,
      },
    ],
    createdAt: "2026-10-18T16:48:00.000Z",
    updatedAt: "2026-10-18T17:02:00.000Z",
  },
];

// ─── Admin Order Details ──────────────────────────────────────────────────────

export const fakeAdminOrders: AdminOrderDetail[] = fakeOrders.map((o, i) => ({
  ...o,
  customer: [
    { id: "usr-001", name: "Ayesha Khan", email: "ayesha@example.com" },
    { id: "usr-002", name: "Bilal Ahmed", email: "bilal@example.com" },
    { id: "usr-003", name: "Sana Malik", email: "sana@example.com" },
    { id: "usr-004", name: "Omar Farooq", email: "omar@example.com" },
  ][i],
}));
