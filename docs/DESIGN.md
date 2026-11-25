# Design System & Vibe-Coding Rules

Clean, minimal single-product e-commerce store. This document is the single source of truth for the frontend. All pages (Auth, Product, Checkout, Orders, Admin) must strictly follow these tokens, recipes, and logic rules.

## 1. Core Principles

- **Tailwind v3 only.** Use semantic classes (`bg-primary`, `text-ink`). Never scatter raw hex values in component code.
- **Preflight is ON.** Tailwind's default reset applies to all pages, including Auth.
- **Single-product store:** One SKU → Product page → Checkout → Orders. No catalog grid.
- **Mobile-first:** Default styles are for mobile. Scale up using `sm:` (640px) and `md:` (768px).
- **No improvisation:** If a color, spacing, or component isn't in this file, do not invent it. Ask or use the closest semantic token.

---

## 2. Color Palette

### Light (Core UI)

| Token | Hex | Tailwind Class | Role |
|---|---|---|---|
| canvas | `#f8f8fc` | `bg-canvas` | Page background |
| surface | `rgba(255,255,255,0.94)` | `bg-surface` | Cards, navbar, modals |
| ink | `#201e31` | `text-ink` | Primary body text |
| heading | `#1e1b35` | `text-heading` | H1, H2, H3 |
| brand-text | `#19172c` | `text-brand-text` | Wordmark/logo |
| label | `#302e43` | `text-label` | Form labels, nav links |
| muted | `#68677a` | `text-muted` | Subtitles, meta (AA-safe) |
| subtle | `#777588` | `text-subtle` | **Decorative/disabled only** (4.4:1 contrast) |
| quiet | `#555368` | `text-quiet` | Secondary emphasis |
| placeholder | `#a2a1af` | `placeholder:text-placeholder` | Input placeholders |
| eyebrow | `#7457d9` | `text-eyebrow` | Overlines, kickers |
| primary | `#674ad1` | `bg-primary` / `text-primary` | Main CTA, active links |
| primary-hover | `#5639bf` | `hover:bg-primary-hover` | Primary hover state |
| primary-bright | `#7657e1` | `border-primary-bright` | Focus rings, gradient start |
| primary-deep | `#4b37a8` | `to-primary-deep` | Gradient end |
| teal | `#29aea2` | `text-teal` | Page glow, "Shipped" accents |
| line | `#e7e7ef` | `border-line` | Card borders, dividers |
| input | `#d9d8e4` | `border-input` | Input borders |
| icon-mute | `#787590` | `text-icon-mute` | Inactive icons |
| danger | `#dc2626` | `text-danger` | Destructive text |
| danger-border | `#fca5a5` | `border-danger-border` | Error borders |
| danger-surface | `#fef2f2` | `bg-danger-surface` | Error backgrounds |

### Dark (Deep accents & dark-mode surfaces)

| Token | Hex | Tailwind Class | Role |
|---|---|---|---|
| midnight | `#090040` | `bg-midnight` | Deepest surface, footer |
| violet-900 | `#471396` | `bg-violet-900` | Deep primary hover |
| plum | `#2A0944` | `bg-plum` | Gradient anchor |
| danger-deep | `#BC0202` | `bg-danger-deep` | Destructive on dark surfaces |
| forest | `#285A48` | `bg-forest` | Success / delivered on dark |
| navy | `#000080` | `bg-navy` | Info accent |

### Pastel (Tints, badges, soft highlights)

| Token | Hex | Tailwind Class | Role |
|---|---|---|---|
| pastel-violet | `#9FA1FF` | `bg-pastel-violet` | CONFIRMED badge fill |
| pastel-periwinkle | `#B5BAFF` | `bg-pastel-periwinkle` | Lighter tint |
| pastel-sky | `#AEE2FF` | `bg-pastel-sky` | Info tint |
| pastel-mint | `#D9F9DF` | `bg-pastel-mint` | Success tint |

### Background Wash (App shell & Auth)

```css
bg-canvas
bg-[radial-gradient(circle_at_0%_0%,rgba(118,87,225,0.18),transparent_36rem),
    radial-gradient(circle_at_100%_100%,rgba(41,174,162,0.14),transparent_34rem)]
```

---

## 3. Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f8f8fc", surface: "rgba(255,255,255,0.94)",
        ink: "#201e31", heading: "#1e1b35", "brand-text": "#19172c",
        label: "#302e43", muted: "#68677a", subtle: "#777588",
        quiet: "#555368", placeholder: "#a2a1af", eyebrow: "#7457d9",
        primary: "#674ad1", "primary-hover": "#5639bf",
        "primary-bright": "#7657e1", "primary-deep": "#4b37a8",
        teal: "#29aea2", line: "#e7e7ef", input: "#d9d8e4", "icon-mute": "#787590",
        danger: "#dc2626", "danger-border": "#fca5a5", "danger-surface": "#fef2f2",
        midnight: "#090040", "violet-900": "#471396", plum: "#2A0944",
        "danger-deep": "#BC0202", forest: "#285A48", navy: "#000080",
        "pastel-violet": "#9FA1FF", "pastel-periwinkle": "#B5BAFF",
        "pastel-sky": "#AEE2FF", "pastel-mint": "#D9F9DF",
      },
      fontFamily: {
        display: ['"Inter Tight"', "Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        ui: ["Roboto", "Inter", "sans-serif"],
      },
    },
  },
};
```

---

## 4. Typography

Load from Google Fonts: **Inter Tight** (500-800), **Inter** (400-700), **Roboto** (400-700). All text: `antialiased`.

| Role | Family | Size | Weight | Tailwind Classes |
|---|---|---|---|---|
| Brand wordmark | Inter Tight | 20px | 700 | `font-display text-xl font-bold tracking-tight text-brand-text` |
| Eyebrow | Inter Tight | 12px | 800 | `font-display text-xs font-extrabold uppercase tracking-[0.11em] text-eyebrow` |
| Page title | Inter Tight | `clamp(28px, 5vw, 34px)` | 700 | `font-display text-[clamp(28px,5vw,34px)] font-bold leading-[1.15] tracking-tight text-heading` |
| Subtitle | Inter | 15px | 400 | `text-[15px] leading-[1.55] text-muted` |
| Label | Inter | 14px | 600 | `text-sm font-semibold text-label` |
| Body / input | Inter | 16px | 400 | `text-base font-normal text-ink` |
| Button | Inter Tight | 15px | 700 | `font-display text-[15px] font-bold` |
| Helper / footer | Roboto | 14px | 400 | `font-ui text-sm text-subtle` |
| Link (inline) | Inter | inherit | 700 | `font-bold text-primary hover:underline` |
| Table cell / Badge | Roboto | 12px-14px | 400-700 | `font-ui text-xs font-bold` (badges), `text-sm` (cells) |
| Field error | Roboto | 12px | 500 | `font-ui text-xs font-medium text-danger mt-1` |

---

## 5. Spacing, Radius & Shadows

### Spacing & Sizing

| Use | Value | Tailwind |
|---|---|---|
| Page pad (desktop) | 32px / 20px | `px-5 py-8` |
| Page pad (mobile) | 18px / 14px | `px-[14px] py-[18px]` |
| Card pad (desktop) | 42px | `p-[42px]` |
| Card pad (mobile) | 28px / 20px | `px-5 py-7` |
| Form stack gap | 18px | `gap-[18px]` |
| Label → control | 8px | `gap-2` |
| Input height | 48px | `h-12` |
| Button min height | 50px | `min-h-[50px]` |
| Content max (forms/auth) | 440px | `max-w-[440px]` |
| Content max (store) | 960px | `max-w-[960px]` |
| Product max | 720px | `max-w-[720px]` |

### Radius

| Use | Value | Tailwind |
|---|---|---|
| Card | 24px (18px on mobile) | `rounded-3xl max-[480px]:rounded-[18px]` |
| Input / button / banner | 10px | `rounded-[10px]` |
| Brand mark | 9px | `rounded-[9px]` |
| Icon button | 8px | `rounded-lg` |

### Shadows & Effects

- **Card:** `shadow-[0_24px_60px_rgba(30,28,67,0.12)]`
- **Primary button:** `shadow-[0_9px_18px_rgba(103,74,209,0.22)]`
- **Primary hover:** `shadow-[0_12px_24px_rgba(103,74,209,0.28)]` + `hover:-translate-y-px`
- **Focus ring:** `border-primary-bright shadow-[0_0_0_4px_rgba(118,87,225,0.13)]`
- **Transitions:** `duration-150` on color/shadow/transform. Respect `prefers-reduced-motion`.

---

## 6. Component Recipes

### Buttons

**Primary:**

```html
class="inline-flex w-full min-h-[50px] items-center justify-center gap-2.5 rounded-[10px] border-0 bg-primary text-white font-display text-[15px] font-bold shadow-[0_9px_18px_rgba(103,74,209,0.22)] hover:bg-primary-hover hover:shadow-[0_12px_24px_rgba(103,74,209,0.28)] hover:-translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[rgba(118,87,225,0.35)] disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none"
```

**Outline (Secondary/Cancel):** `border border-input bg-surface text-ink hover:bg-canvas`

**Danger:** `bg-danger-deep text-white hover:bg-[#9a0101]`

**Ghost/Icon:** `text-icon-mute hover:text-heading hover:bg-[rgba(118,87,225,0.08)]`

### Inputs

```html
class="h-12 w-full rounded-[10px] border border-input bg-white px-3.5 text-ink font-sans outline-none placeholder:text-placeholder focus:border-primary-bright focus:shadow-[0_0_0_4px_rgba(118,87,225,0.13)] aria-[invalid=true]:border-danger-border"
```

- **Label:** Wraps control. `grid gap-2 text-sm font-semibold text-label`.
- **Textarea:** Same border/radius, `min-h-[96px] py-3`.
- **Checkbox:** `size-4 accent-primary`.

### Cards

**Form/Auth Card:**

```html
class="w-full max-w-[440px] rounded-3xl border border-line bg-surface p-[42px] shadow-[0_24px_60px_rgba(30,28,67,0.12)] backdrop-blur max-[480px]:rounded-[18px] max-[480px]:px-5 max-[480px]:py-7"
```

**Brand Mark:**

```html
class="grid size-[29px] place-items-center rounded-[9px] text-white text-[23px] font-extrabold leading-none bg-gradient-to-br from-primary-bright to-primary-deep"
```

### Tables

Wrapper: `w-full overflow-x-auto rounded-[10px] border border-line bg-surface`

- **Header:** `bg-canvas font-ui text-xs font-extrabold uppercase tracking-[0.11em] text-eyebrow`
- **Cells:** `px-4 py-3.5 text-sm text-ink border-t border-line`
- **Row hover:** `hover:bg-[rgba(118,87,225,0.08)]`
- **Numbers:** `tabular-nums font-semibold`

### Status Badges

Pill: `inline-flex items-center rounded-full px-2.5 py-0.5 font-ui text-xs font-bold`

| Status | Classes |
|---|---|
| PENDING | `bg-canvas text-muted border border-line` |
| CONFIRMED | `bg-pastel-violet text-primary` |
| SHIPPED | `bg-[rgba(41,174,162,0.14)] text-heading` |
| DELIVERED | `bg-primary text-white` |
| CANCELLED | `bg-danger-surface text-danger border border-danger-border` |

### Dialogs & Toasts

- **Dialog:** Fixed overlay `bg-black/40 backdrop-blur-sm`. Panel: `max-w-[420px] rounded-3xl bg-surface p-[42px]`. Must have focus trap, `Escape` to close, `aria-modal="true"`.
- **Toasts:** Top-right, `aria-live="polite"`, auto-dismiss 4s.

---

## 7. Layout & Responsiveness

### Navbar

`sticky top-0 z-20 border-b border-line bg-surface backdrop-blur`

Inner: `mx-auto flex max-w-[960px] items-center justify-between gap-3 px-4 py-3 sm:px-5`.

- **Mobile (≤640px):** Brand + single overflow menu button (`min-h-10 min-w-10`). Do not use full-screen drawers. Do not shrink text below 14px.

### Page Chrome

`min-h-svh bg-canvas text-ink antialiased` (with background wash).

Main: `mx-auto w-full max-w-[960px] px-4 py-6 sm:px-5 sm:py-8`.

### Mobile Rules

- **Breakpoints:** Auth/forms use `480px` (`max-[480px]:`). Store layouts use Tailwind `sm:` (640px).
- **Touch targets:** Minimum 40px. Inputs `h-12`, buttons `min-h-[50px]`, icon buttons `min-h-10 min-w-10`.
- **Checkout:** Summary stacks below form on mobile. `sm:grid sm:grid-cols-2 sm:gap-8`.
- **Tables:** Always `overflow-x-auto`. Never hide required columns.

---

## 8. App Logic & Guardrails

### Routing & Guards

| Path | Auth | Role | Notes |
|---|---|---|---|
| `/` | public | — | Product page |
| `/checkout` | required | CUSTOMER | Redirect to `/login?next=/checkout` |
| `/orders` | required | CUSTOMER | List |
| `/orders/:id` | required | CUSTOMER | Detail (404 if not owned) |
| `/admin/orders` | required | ADMIN | 403 page for non-admins |
| `/login`, `/signup` | public | — | |

### Order State Machine

Keep this map next to the badge map in code.

```
PENDING   → CONFIRMED, CANCELLED   (Customer may cancel while PENDING)
CONFIRMED → SHIPPED, CANCELLED     (Admin only)
SHIPPED   → DELIVERED              (Admin only)
DELIVERED → (terminal)
CANCELLED → (terminal)
```

### Money Contract

- All arithmetic in **integer paisa** (never floats).
- Format at the edge: `new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paisa / 100)`.
- Always render money with `tabular-nums`.
- Checkout totals are labelled **"Estimate"** until server confirms.

### Accessibility

- Every field has a visible label + `aria-describedby` pointing to its error.
- Invalid fields: `aria-invalid="true"`. Form errors: `role="alert"`.
- Password toggle: `<button type="button" aria-label="Show password">`.
- Quantity stepper: `min`, `max`, `step`; disabled state when stock = 0.
- Implement states: default / hover / focus-visible / disabled / loading / skeleton / empty / error / retry.

---

## 9. Acceptance Checklist

A page is done when:

- [ ] Layout verified at 320, 480, 640, 768, 1024 px.
- [ ] Keyboard-only walkthrough works (Tab, Enter, Space, Escape).
- [ ] Every field has a visible label; errors are announced.
- [ ] Tables scroll horizontally without hiding required columns.
- [ ] Money is `tabular-nums`, 2dp, integer paisa source.
- [ ] Loading / empty / error / retry states exist.
- [ ] No new hex colors outside the token tables.
- [ ] No raw hex in component code — only semantic classes.
- [ ] Dialog has focus trap, Escape, focus return.
- [ ] `prefers-reduced-motion` respected.
