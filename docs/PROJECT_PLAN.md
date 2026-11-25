# One-Comm: Project Plan (frontend source material)

> **For AI tools:** This file is READ-ONLY reference. Read it for facts about the product, the screens and the working rules. Never edit it, and never invent fields, endpoints, error codes or rules that are not listed here or in `docs/API.md`. If something is missing, ask the developer.
>
> **API details live in `docs/API.md`.** Endpoints, types, error codes, input limits and the idempotency rules are defined there and only there. This file does not repeat them.
>
> **Current scope: CUSTOMER ONLY. The admin role is parked.** Nothing in sections 1 to 9 requires admin work. Do not build or suggest admin screens, admin routes, `AdminRoute`, role-based navbar links or `ALLOWED_TRANSITIONS`. Section 10 keeps the parked material for later.
>
> **Scope of work for the AI: FRONTEND ONLY.** The developer is building the backend (NestJS API, Prisma, Postgres, Supabase Auth) personally. Do not create, change or suggest backend code.

---

## 1. What One-Comm is

A single-product online store. Customers sign up, log in, view the one product, choose a quantity, check out with shipping details (cash on delivery) and track their own orders.

### Role in scope

| Role | Can do |
|---|---|
| Customer | Sign up and log in; view the product; choose quantity; check out; list their own orders; open their own order; cancel their own order while it is PENDING |

### Out of scope (do not build)

Online payments (cash on delivery only), cart, multiple products, emails, product create/edit screens, full RBAC, and everything admin (see section 10). Exactly one product exists, seeded in the database.

### Currency and money

Prices are integers in minor units (paisa). `150000` means 1,500.00 PKR. Divide by 100 **for display only**. Never use floats for money and never do arithmetic on formatted strings.

---

## 2. Current progress

| Item | Status |
|---|---|
| Vite + React + TypeScript project | Done |
| Login screen (`src/pages/Login.tsx`) | Done (built by the developer) |
| Signup screen (`src/pages/Signup.tsx`) | Done (built by the developer) |
| Backend API | Being built by the developer, in parallel |
| Remaining screens | To do (see section 8) |

> Developer: if your Login and Signup files live at different paths, fix the two paths above. AI tools use them to find the existing styling.

Do not rewrite or restyle the existing Login and Signup screens unless asked. Before building any new screen, read those two files and match their look and feel (spacing, colors, input and button styles).

---

## 3. Tech stack (frontend)

- React + Vite + TypeScript
- Tailwind CSS
- React Router (routing, protected routes)
- TanStack Query (server state: queries, mutations, cache invalidation)
- React Hook Form + Zod (forms and validation, via `@hookform/resolvers`)
- Supabase JS client (login and signup only)
- Tests later: Vitest + React Testing Library

### Architecture rules the frontend must respect

1. The browser talks to Supabase **only for login and signup**. Everything else goes through the developer's API with the header `Authorization: Bearer <access token>`. The browser never queries the database directly.
2. The backend is the source of truth for price, total, stock and user id. The frontend never sends a price, a total, a user id, a product id or a status for orders. Any total shown on the checkout screen is an **estimate**.
3. The API enforces the real security. The UI only hides or disables things for convenience.
4. All API calls go through one module (`src/lib/api.ts`) that adds the token, parses JSON and turns error responses into a typed `ApiError`.
5. Until the real API is connected, screens use typed fake data from **one file: `src/mocks/data.ts`**, structured so it can be swapped for real calls without changing the screens.

---

## 4. Data and API

All types, endpoints, request bodies, error codes and input limits are in **`docs/API.md`**. Read sections 2 to 5 of that file before building any screen that talks to the API.

Facts that matter for display (details in API.md):

- Orders show the price snapshot stored on each item, never the live product price.
- `orderNumber` is an opaque string. Never parse it.
- The checkout total is an estimate. The confirmation page shows the server's final total.
- Format money with `Intl.NumberFormat` using the product's `currency`, after dividing minor units by 100.
- Trim whitespace from text fields before validating.

---

## 5. Order status flow (for display)

```
PENDING   -> CONFIRMED, CANCELLED
CONFIRMED -> SHIPPED,   CANCELLED
SHIPPED   -> DELIVERED
DELIVERED -> (final)
CANCELLED -> (final, stock returned)
```

In the customer-only scope, the frontend does not change statuses except for one action: a customer can cancel an order **only while it is PENDING**. Every other status is display only, with its own colour-coded badge and no actions. Cancelling returns the units to stock (handled by the backend).

---

## 6. Frontend structure

```
src/
  lib/        api.ts (fetch wrapper + ApiError), supabase.ts, money.ts
  auth/       AuthProvider, ProtectedRoute
  pages/      Login, Signup, Product, Checkout, OrderConfirmation,
              MyOrders, OrderDetails, NotFound
  components/ shared UI (navbar, status badge, pagination, dialogs, toasts)
  hooks/      query and mutation hooks
  mocks/      data.ts (the only place for fake data)
  main.tsx
```

### Routes

| Route | Who | Page |
|---|---|---|
| /login | Public | Login |
| /signup | Public | Signup |
| / (or /product) | Public | Product |
| /checkout | Logged in | Checkout |
| /orders/:id/confirmation | Logged in | Order confirmation |
| /orders | Logged in | My orders |
| /orders/:id | Logged in | Order details (+ cancel) |
| * | Public | Not found |

Protected routes redirect to login and remember the target page so the user returns after logging in.

---

## 7. Every screen must handle these states

Loading, empty, error (including API down), and success. Prefer showing stale data while refetching over blank flashes.

Error-to-UI mapping is in `docs/API.md` section 4 (status codes table). Follow it exactly.

---

## 8. Frontend features to build (checklist)

Each item has a "done when" line. Build one at a time.

- [x] **Login and Signup** (already built by the developer)
- [ ] **8.1 Foundations:** routing, auth provider (`user`, `session`, `signIn`, `signUp`, `signOut`, subscribing to auth changes), TanStack Query client, `api.ts` with typed `ApiError`, `ProtectedRoute`, navbar (product, my orders, login or logout), not-found page. *Done when:* you can navigate between placeholder pages and protected pages redirect when logged out.
- [ ] **8.2 Auth UI wiring:** on signup call Supabase `signUp` with the name saved in user metadata, then `POST /users/me`, then go to the product page. On login call `signInWithPassword`, then `POST /users/me` once (idempotent) using the name from `session.user.user_metadata.name`. If that name is missing, ask the user for it instead of guessing (details in `docs/API.md` section 3.3). Friendly messages for wrong credentials and API errors; disable the button while submitting; session survives refresh. *Done when:* a new user can sign up, log out and log in again.
- [ ] **8.3 Product page:** `useQuery` on `GET /product`; name, description, image, formatted price, stock status; quantity selector from 1 to the smaller of 10 and available stock; "Buy now" goes to checkout (logged-out users go to login first and return); loading, error and out-of-stock states. *Done when:* it handles API-down and out-of-stock gracefully.
- [ ] **8.4 Checkout page:** form for name, phone, address, notes with Zod using the limits in `docs/API.md` section 5; order summary labelled as an estimate; idempotency key handled per `docs/API.md` section 3.5 (new key whenever the form values change); `useMutation` with the button disabled while pending; errors: 400 maps `details` onto form fields, 409 `INSUFFICIENT_STOCK` shows how many are left and refreshes the product, 401 goes to login; on success invalidate order queries and go to confirmation. *Done when:* a valid checkout creates one order and a double click creates only one.
- [ ] **8.5 Order confirmation:** `/orders/:id/confirmation` loads from `GET /orders/:id`; shows order number, status, item name, quantity, unit price, total, shipping details and a "pay on delivery" note; links to My orders and Back to product. Must work after a refresh and show not-found for someone else's order.
- [ ] **8.6 Customer orders:** `/orders` with pagination (keep the previous page visible while the next loads), order number, date, total and a colour-coded status badge; order detail view with a Cancel button (PENDING only) behind a confirmation dialog; handle 409 with a clear message.
- [ ] **8.7 Polish and tests:** toast notifications, error boundary, 404 page, responsive check at phone width; Vitest tests for the money formatter, checkout form validation (invalid phone, empty address) and status badge mapping.

---

## 9. Working rules for the AI

1. Frontend only. Never touch backend code or database files.
2. One screen or feature per request. Make a short plan first, then build.
3. Use typed fake data from `src/mocks/data.ts` until the real API is connected. Keep the data shape identical to the types in `docs/API.md` section 2.
4. Reuse existing components and match the existing Login and Signup styling.
5. Never trust or send prices, totals, user ids or order status from the client.
6. Use Conventional Commits (`feat(web): ...`, `fix(web): ...`, `chore: ...`, `test: ...`).
7. If these docs do not answer a question, ask the developer instead of guessing.

---

## 10. Parked: admin role (reference only, do NOT build)

The admin role is out of scope for now. When admin work starts, restore the following into the sections above, together with `docs/API.md` section 8 (admin endpoints, types, `ALLOWED_TRANSITIONS`).

- **Role:** Admin can list all orders (filter by status, search by order number), open any order with customer details, and move an order through its statuses (cancel from PENDING or CONFIRMED, never once SHIPPED).
- **Auth and navbar:** an `AdminRoute` guard, and an admin link in the navbar shown to admins using `role` from `GET /users/me`. Role-based UI is a convenience only.
- **Routes:** `/admin/orders` (Admin order list), `/admin/orders/:id` (Admin order details + status control).
- **Files:** `auth/AdminRoute`, `pages/admin/AdminOrders`, `pages/admin/AdminOrderDetails`.
- **Feature (was 9.7):** `/admin/orders` table with status filter, search by order number and pagination; `/admin/orders/:id` with full details, customer info and a status control offering only allowed next statuses; clear 403 and 409 handling; hide admin links from customers.
