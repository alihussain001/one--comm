# One-Comm: Tech Stack (frontend only)

> **For AI tools:** This file is READ-ONLY reference. Use only the libraries listed here. Do not add a new dependency, swap a library or suggest backend code. If something is missing, ask the developer.
>
> Related files: `PROJECT_PLAN.md` (product, screens, rules), `docs/API.md` (endpoints, types, errors, limits), `DESIGN.md` (visual rules).
>
> **Scope: customer-only frontend.** The backend (NestJS, Prisma, Postgres, Supabase Auth) is built by the developer. Never create or change it.

---

## 1. Core stack

| Area | Tool | Used for |
|---|---|---|
| Framework | React | UI, function components and hooks only (no class components, except an error boundary if required) |
| Build tool | Vite | Dev server and build |
| Language | TypeScript | Strict mode. No `any`; use `unknown` and narrow it |
| Styling | Tailwind CSS **v3** | All styling. Use v3 syntax and `tailwind.config.js`. Do not use v4 syntax (`@import "tailwindcss"`, `@theme`) |
| Routing | React Router | Routes, protected routes, redirect back after login |
| Server state | TanStack Query | `useQuery` for reads, `useMutation` for writes, cache invalidation |
| Forms | React Hook Form | Form state and submission |
| Validation | Zod + `@hookform/resolvers` | Schemas for forms, limits from `docs/API.md` section 5 |
| Auth client | Supabase JS (`@supabase/supabase-js`) | **Login and signup only** |
| Tests (later) | Vitest + React Testing Library | Money formatter, checkout validation, status badge mapping |

Use the versions already in `package.json`. Do not upgrade or downgrade a package unless asked.

---

## 2. Rules for each tool

### TypeScript
- Types for API data match `docs/API.md` section 2 exactly. Do not invent fields.
- Money is `number` in minor units (paisa). Never floats, never arithmetic on formatted strings.

### Tailwind CSS v3
- Use the semantic colour tokens defined in `tailwind.config.js` and `DESIGN.md` (for example `bg-surface`, `text-primary`), not raw hex values or arbitrary colours.
- Fonts: **Inter Tight**, **Inter**, **Roboto**, as set in the Tailwind config. Do not add other fonts.
- Mobile first. Use responsive prefixes (`sm:`, `md:`, `lg:`) and check phone width.
- Match the look of the existing `src/pages/Login.tsx` and `src/pages/Signup.tsx` (spacing, input and button styles). Do not restyle those two files unless asked.

### React Router
- Routes as listed in `PROJECT_PLAN.md` section 6.
- `ProtectedRoute` redirects logged-out users to `/login` and remembers the target page.
- No admin routes, no `AdminRoute`, no role-based navbar links.

### TanStack Query
- One `QueryClient`, provided in `main.tsx`.
- Queries and mutations live in `src/hooks/`, not inside page components.
- Show stale data while refetching (for example `placeholderData: keepPreviousData` on paginated lists).
- After a successful checkout or cancel, invalidate the order queries.

### React Hook Form + Zod
- One Zod schema per form, resolved with `zodResolver`.
- Trim whitespace on text fields before validating.
- Map server `400` `details` onto form fields.
- Disable the submit button while a mutation is pending.

### Supabase JS
- Client lives in `src/lib/supabase.ts`.
- Use it only for `signUp`, `signInWithPassword`, `signOut`, the session and auth state changes.
- Never query the database from the browser.

---

## 3. API access

- All API calls go through **one module: `src/lib/api.ts`**.
- It adds `Authorization: Bearer <access token>`, parses JSON and turns error responses into a typed `ApiError`.
- Use the native `fetch`. Do not add axios or another HTTP client.
- The frontend never sends a price, total, user id, product id or order status. The backend is the source of truth. Any total on the checkout page is labelled as an **estimate**.
- Until the real API is connected, screens read typed fake data from **`src/mocks/data.ts`** (the only place for fake data). Keep its shape identical to `docs/API.md` section 2 so it can be swapped for real calls without changing screens.

---

## 4. Money and formatting

- Helper lives in `src/lib/money.ts`.
- Divide minor units by 100 **for display only**, then format with `Intl.NumberFormat` using the product's `currency`.
- `orderNumber` is an opaque string. Never parse it.
- Orders show the price snapshot stored on each item, never the live product price.

---

## 5. Folder structure

```
src/
  lib/         api.ts, supabase.ts, money.ts
  auth/        AuthProvider, ProtectedRoute
  pages/       Login, Signup, Product, Checkout, OrderConfirmation,
               MyOrders, OrderDetails, NotFound
  components/  shared UI (navbar, status badge, pagination, dialogs, toasts)
  hooks/       query and mutation hooks
  mocks/       data.ts
  main.tsx
```

---

## 6. Every screen handles four states

Loading, empty, error (including API down) and success. Error-to-UI mapping follows the status codes table in `docs/API.md` section 4.

---

## 7. Do not use

- Redux, Zustand, MobX or any global store (server state is TanStack Query, local state is React state or React Context for auth).
- A UI component library (MUI, Chakra, Ant) or CSS-in-JS. Tailwind only.
- axios, SWR or a second data-fetching library.
- Any payment library. Cash on delivery only.
- Any backend, ORM or database code.
- Admin features (parked, see `PROJECT_PLAN.md` section 10).

---

## 8. Conventions

- Conventional Commits: `feat(web): ...`, `fix(web): ...`, `chore: ...`, `test: ...`.
- One screen or feature per request. Make a short plan first, then build.
- Reuse existing components before creating new ones.
- If these docs do not answer a question, ask the developer instead of guessing.
