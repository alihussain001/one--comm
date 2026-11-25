# API contract (frontend view)

> **For AI tools:** This is the single source of truth for the contract between the frontend and the developer's NestJS API: endpoints, types, errors and input limits. Build the frontend against it. Do not invent endpoints, fields or error codes. If something is missing or unclear, ask the developer.
>
> **Frontend only.** The developer builds the API separately. Never create or change backend code.
>
> **Current scope: CUSTOMER ONLY.** The admin role, admin screens and admin endpoints are parked (see section 8). Do not build them, and do not add role-based UI.
>
> **Status of this file:** Endpoints, request bodies, the error shape and the error codes come from the original project plan. Items marked **[PROPOSED]** are decisions the plan left open; the developer must confirm them against the real API and then remove the tag. This file is also the only place types are defined (there is no separate TYPES file).

---

## 1. Basics

| Item | Value |
|---|---|
| Base URL | `import.meta.env.VITE_API_URL` (dev default `http://localhost:3001`) |
| Format | JSON requests and responses, `Content-Type: application/json` |
| Field naming | camelCase **[PROPOSED]** |
| Dates | ISO 8601 strings, e.g. `2026-10-15T05:37:00.000Z` **[PROPOSED]** |
| IDs | UUID strings |
| Money | Integer minor units (paisa). `150000` = 1,500.00 PKR. Divide by 100 for display only |
| Auth | `Authorization: Bearer <Supabase access token>` on every protected request |
| Optional header | `Idempotency-Key: <uuid>` on `POST /orders` |
| Response header | `x-request-id` (useful to show in error messages) |

Login and signup are handled by the Supabase client in the browser. Everything else goes through this API. The browser never queries the database.

### One API client

All calls go through `src/lib/api.ts`, which:

1. Adds the `Authorization` header from the current Supabase session.
2. Sends and parses JSON.
3. Converts non-2xx responses into a typed `ApiError` with `statusCode`, `code`, `message`, `details`, `requestId`.
4. Handles network failures as a separate "API unreachable" error.

Screens never call `fetch` directly.

---

## 2. Types

```ts
type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type ProductDto = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceMinor: number;
  currency: string;            // "PKR"
  imageUrl: string | null;
  inStock: boolean;
  availableQuantity: number;
};

// The API also returns a `role` field. The frontend ignores it for now.
type UserDto = { id: string; email: string; name: string };

// [PROPOSED] derived from the data model; confirm against the real DTOs
type OrderItemDto = {
  id: string;
  productId: string;
  productName: string;         // snapshot at order time
  quantity: number;
  unitPriceMinor: number;      // snapshot at order time
};

type OrderDto = {
  id: string;
  orderNumber: string;         // opaque text; never parse it
  status: OrderStatus;
  totalMinor: number;
  currency: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  notes: string | null;
  items: OrderItemDto[];
  createdAt: string;
  updatedAt: string;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

type ApiErrorBody = {
  statusCode: number;
  code: string;
  message: string;
  details: FieldError[] | null;
  path: string;
  timestamp: string;
  requestId: string;
};

type FieldError = { field: string; messages: string[] };
```

`OrderStatus` still has all five values, because customers see orders in every status (an admin may move them later). The frontend only needs to display them with the right badge.

---

## 3. Endpoints (customer scope)

| # | Method | Path | Who | Success |
|---|---|---|---|---|
| 1 | GET | `/health` | Public | 200 |
| 2 | GET | `/product` | Public | 200 `ProductDto` |
| 3 | POST | `/users/me` | Logged in | 201 new, 200 existing: `UserDto` |
| 4 | GET | `/users/me` | Logged in | 200 `UserDto` |
| 5 | POST | `/orders` | Logged in | 201 new, 200 replay: `OrderDto` |
| 6 | GET | `/orders` | Logged in | 200 `Paginated<OrderDto>` |
| 7 | GET | `/orders/:id` | Logged in | 200 `OrderDto` |
| 8 | POST | `/orders/:id/cancel` | Logged in | 200 `OrderDto` |

Note: the product path is singular (`/product`); the others are plural.

### 3.1 GET /health

Public. Returns `{ "status": "ok", "db": "up" }`. Frontend use: optional "API reachable" check only.

### 3.2 GET /product

Public. No token.

- **200:** `ProductDto`.
- **404:** no active product (`PRODUCT_NOT_AVAILABLE`).
- **UI:** loading skeleton, error state with retry, "currently unavailable" state on 404, out-of-stock state when `inStock` is false. Quantity selector max = `min(10, availableQuantity)`.

### 3.3 POST /users/me

Creates the app profile for the logged-in Supabase identity. Safe to call repeatedly.

Request:

```json
{ "name": "Ayesha Khan" }
```

- **201:** new profile. **200:** profile already existed. Treat both as success.
- **400:** invalid name. **401:** bad token.
- Identity (id, email) comes from the token, never the body. Send only `name`.

**Where the name comes from.** Supabase login returns only the email, so the name must be stored at signup and read back later:

- At signup, save it in Supabase user metadata: `supabase.auth.signUp({ email, password, options: { data: { name } } })`.
- Everywhere else, read it from `session.user.user_metadata.name`.
- If `user_metadata.name` is missing (an account created some other way), do not invent a name. Show a small "What should we call you?" prompt, then call `POST /users/me` with the answer.

**When to call it:**
- After Supabase `signUp`, when a session exists.
- Once after every `signInWithPassword`, using the name from user metadata.
- If email confirmation is on, `signUp` returns no session, so the call cannot be made until the user logs in. The login-time call covers this.

### 3.4 GET /users/me

- **200:** `UserDto`.
- **401:** bad token. **403 `PROFILE_REQUIRED`:** logged in but no profile yet.
- **UI:** load once after login to show the user's name. On `PROFILE_REQUIRED`, call `POST /users/me` (name from user metadata, see 3.3) and retry once.

### 3.5 POST /orders

The client sends **only** quantity and shipping details.

Request:

```json
{
  "quantity": 2,
  "shippingName": "Ayesha Khan",
  "shippingPhone": "+923001234567",
  "shippingAddress": "House 12, Street 4, Karachi",
  "notes": "Call before delivery"
}
```

Header: `Idempotency-Key: <uuid>`.

Rules:
- Never send `userId`, `productId`, `price`, `totalMinor` or `status`. Extra fields cause a 400.
- `quantity` must be a number, not a string. Trim all text. Omit `notes` when empty.

**Idempotency key rules:**
- Generate the key with `crypto.randomUUID()` for each checkout attempt.
- Reuse the same key only when retrying the **identical** request (double click, network retry, timeout).
- Generate a **new** key whenever any form value changes (quantity, name, phone, address or notes), and after any 4xx failure the user fixes. Reusing a key with changed values could make the API replay the old order.
- Keep the current key in a ref or state next to the last submitted values, and compare before sending.

Responses:
- **201:** order created. **200:** same user and key already used; the existing order is returned. Treat both as success.
- **400:** validation (`details` has field errors). Map onto form fields.
- **401:** send the user to login, remember the checkout page.
- **404 `PRODUCT_NOT_AVAILABLE`:** show "product unavailable".
- **409 `INSUFFICIENT_STOCK`:** show how many are left (from `message`), refetch the product, keep the form data.
- **UI on success:** invalidate order queries, go to `/orders/:id/confirmation`.

### 3.6 GET /orders

The logged-in user's own orders, newest first.

Query: `page` (default 1, min 1), `limit` (default 10, max 50).

- **200:** `Paginated<OrderDto>`. **401:** bad token.
- The user is taken from the token. Never send a user id.
- **UI:** include `page` in the query key; keep the previous page visible while the next loads.

### 3.7 GET /orders/:id

- **200:** `OrderDto`. **401.** **404 `ORDER_NOT_FOUND`:** missing **or not yours** (same response on purpose).
- **UI:** the confirmation page and order details load from here, so refresh and shared links work. Show a plain not-found state on 404.

### 3.8 POST /orders/:id/cancel

No body.

- **200:** the cancelled `OrderDto`. **401.** **404 `ORDER_NOT_FOUND`.**
- **409 `ORDER_NOT_CANCELLABLE`:** the order is no longer PENDING. Show the message, then refetch the order.
- **UI:** show the Cancel button only when `status === "PENDING"`, behind a confirmation dialog. Refresh the order and the orders list after success.

---

## 4. Errors

### Standard shape (every error from every endpoint)

```json
{
  "statusCode": 409,
  "code": "INSUFFICIENT_STOCK",
  "message": "Only 3 units left",
  "details": null,
  "path": "/orders",
  "timestamp": "2026-10-15T05:37:00.000Z",
  "requestId": "b7f1c2de"
}
```

Validation errors (400) carry field-level `details` **[PROPOSED format]**:

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": [{ "field": "quantity", "messages": ["quantity must not be greater than 10"] }],
  "path": "/orders",
  "timestamp": "2026-10-15T05:37:00.000Z",
  "requestId": "b7f1c2de"
}
```

### Status codes

| Code | Meaning | Frontend behavior |
|---|---|---|
| 400 | Invalid input | Show `details` under the matching fields |
| 401 | Missing, invalid or expired token | Go to login, remember the target page |
| 403 | No app profile (`PROFILE_REQUIRED`) | Create the profile via `POST /users/me` and retry once |
| 404 | Missing, or not yours | Plain not-found state |
| 409 | Conflicts with current state | Show the message, refetch the data |
| 429 | Rate limited **[PROPOSED]** | "Too many requests, try again shortly" |
| 500 | Unexpected bug | Generic "something went wrong" message; show `requestId` |
| Network error | API unreachable | "Can't reach the server" with a retry button |

### Error codes

| Code | Status | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Invalid input (code name **[PROPOSED]**; confirm) |
| `PRODUCT_NOT_AVAILABLE` | 404 | No active product |
| `INSUFFICIENT_STOCK` | 409 | Not enough units; message says how many are left |
| `ORDER_NOT_FOUND` | 404 | Order missing or not owned by the caller |
| `ORDER_NOT_CANCELLABLE` | 409 | Order is no longer PENDING |
| `PROFILE_REQUIRED` | 403 | Logged in but no app profile |

Always branch on `code`, never on `message`. Messages are for display only.

---

## 5. Rules the frontend must mirror

- A customer can cancel an order **only while it is `PENDING`**.
- `DELIVERED` and `CANCELLED` are final states. Show them with their own badge and no actions.

### Input limits (mirror in Zod; the API validates again)

| Field | Rule |
|---|---|
| quantity | Integer, 1 to 10 (named constant `MAX_QUANTITY = 10`), and not above stock |
| shippingName | 2 to 100 characters |
| shippingPhone | Matches the regex below |
| shippingAddress | 10 to 300 characters |
| notes | Optional, up to 500 characters |
| page | Integer, minimum 1 |
| limit | Integer, 1 to 50 (default 10) |

Phone regex (copy exactly, no backslash before the `|`):

```ts
const PHONE_REGEX = /^(\+92|0)3\d{9}$/;
```

---

## 6. Environment and CORS (things that break first)

Frontend variables (public; they are visible in the browser):

```
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...        # public key only; never the secret / service-role key
```

Newer Supabase dashboards call the public key the "publishable key". Either name is fine as long as it is the public one. Use whichever the developer's project shows, and keep the variable name consistent with the existing `src/lib/supabase.ts`.

API-side settings the frontend depends on (developer must configure):

- `WEB_ORIGIN` includes the frontend origin (`http://localhost:5173` in development).
- CORS allows the request headers `Authorization`, `Content-Type` and `Idempotency-Key`. A missing allowed header makes the browser block the request, and it looks like a network error.
- CORS exposes `x-request-id` if the frontend should read it.
- The global error filter returns the standard error shape for **every** failure, including 401, 403, 404 and 429.

---

## 7. Switching from fake data to the real API

1. Until the API is ready, use typed fake data from **one file: `src/mocks/data.ts`**, shaped exactly like section 2. Do not put mock data anywhere else.
2. Replace fake data with `api.ts` calls one endpoint at a time, in this order: `GET /product`, `POST /users/me` and `GET /users/me`, `POST /orders`, then the orders endpoints.
3. Test each against the real API: success, validation error, 401, 404 and 409.
4. When the developer exports `docs/openapi.json` (Swagger), consider generating types from it (for example with `openapi-typescript`) to replace the hand-written types and catch drift early.

---

## 8. Parked: admin role (do NOT build now)

Everything admin-related is removed from the frontend scope for now. Restore this section into the sections above when admin work starts.

**Endpoints (admin only, 401/403 for others):**

| Method | Path | Success |
|---|---|---|
| GET | `/admin/orders` (query: `status`, `search`, `page`, `limit`) | 200 `Paginated<AdminOrderListItemDto>` |
| GET | `/admin/orders/:id` | 200 `AdminOrderDetailDto` |
| PATCH | `/admin/orders/:id/status` body `{ "status": "CONFIRMED" }` | 200 `AdminOrderDetailDto` **[PROPOSED]** |

**Types:**

```ts
type Role = "CUSTOMER" | "ADMIN";
type CustomerSummary = { id: string; name: string; email: string };   // never authId
type AdminOrderListItemDto = {            // [PROPOSED] no items
  id: string; orderNumber: string; status: OrderStatus;
  totalMinor: number; currency: string; createdAt: string; customer: CustomerSummary;
};
type AdminOrderDetailDto = OrderDto & { customer: CustomerSummary };
```

When admin work starts, `UserDto` also gains `role: Role`.

**Extra rules and errors:**
- `403` also means "not an admin". `409 INVALID_STATUS_TRANSITION`: transition not allowed, same status again, or someone else changed it first.
- `ALLOWED_TRANSITIONS` (keep in one shared place):

```ts
const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING:   ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPED", "CANCELLED"],
  SHIPPED:   ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};
```

- Admin can cancel from `PENDING` or `CONFIRMED`, never after `SHIPPED`.
- Screens: `/admin/orders` (table, status filter, search, pagination) and `/admin/orders/:id` (details, customer info, status control showing only allowed next statuses). `AdminRoute` guard; admin link in the navbar for admins, using `role` from `GET /users/me`. Role-based UI is a convenience only; the API enforces access.

---

## 9. Open decisions (developer to confirm, then delete this list)

- [ ] Exact fields of `OrderDto` / `OrderItemDto`
- [ ] `orderNumber` format
- [ ] Validation error `code` name and `details` format
- [ ] 429 response uses the standard error shape
- [ ] CORS allows `Authorization`, `Idempotency-Key` and exposes `x-request-id`
