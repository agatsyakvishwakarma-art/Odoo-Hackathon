---
name: Voyage Flux Desktop
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3c4947'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6c7a77'
  outline-variant: '#bbcac6'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#4fdbc8'
  secondary: '#a93349'
  on-secondary: '#ffffff'
  secondary-container: '#fe7488'
  on-secondary-container: '#720525'
  tertiary: '#9b4426'
  on-tertiary: '#ffffff'
  tertiary-container: '#f38764'
  on-tertiary-container: '#6c2106'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#ffdadc'
  secondary-fixed-dim: '#ffb2b9'
  on-secondary-fixed: '#400010'
  on-secondary-fixed-variant: '#881a33'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#3a0b00'
  on-tertiary-fixed-variant: '#7c2d11'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  deep-slate: '#1F2937'
  surface-white: '#FFFFFF'
  warning-amber: '#F59E0B'
  critical-red: '#EF4444'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 280px
  gutter: 24px
  margin-desktop: 48px
  container-max: 1440px
  section-gap: 40px
  component-gap: 12px
---

# Screen: App Shell + Dashboard

**Source:** `client/src/components/AppShell.jsx`, `client/src/screens/DashboardScreen.jsx`  
**Screen ids:** `dashboard` (default after login)

## Brand & Style
Authenticated Yatrik is a **live planning console**. Voyage Flux specifies a 280px left sidebar; this product uses a **top navigation bar** plus footer so the main canvas stays wide. The dashboard is the home: greeting, next trip hero, departure snippet, and a short checklist. Tone is professional, optimistic, and high-legibility (Deep Slate on `#F8F9FA`).

## Colors
- **Primary (Teal):** Plan New Trip, active nav, weather/date badges, checklist accents.
- **Navy / Gold:** YATRIK lockup in header and footer only.
- **Muted pills:** Browse Destinations (outline / gray fill).
- **Warning amber / critical red:** Reserved for budget/profile elsewhere; dashboard uses teal confirmation badges.
- **Containers:** White cards on gray canvas. Nav is white with 1px `#E5E7EB` bottom border.

## Typography
**Inter** only.

- Dashboard H1: `headline-lg` “Welcome back, {firstName}.”
- Subtitle: `body-md` countdown or empty/error copy.
- Hero trip name: `headline-md` / `headline-lg`.
- Kickers (DEPARTURE FLIGHT, PRE-TRIP CHECKLIST): `label-sm` uppercase tracking.
- Nav links: `label-md`. Footer headings: `label-md`; footer body: `body-sm`.

## Layout & Spacing
Fixed-fluid hybrid. Main max 1440px, 48px desktop margins, 24px gutters.

- **Top nav:** Brand | Dashboard · My Trips · Explore | search · bell · avatar.
- **Main:** Page content (dashboard grid below).
- **Footer:** Four columns — brand, Product, Resources, Get the App.
- **Dashboard Up Next:** ~60/40 grid — hero trip image | flight + checklist stack.
- **Breakpoints:** Tablet compresses search; mobile stacks hero above side cards, nav collapses.

## Elevation & Depth
Nav and footer are flat frames. Hero and side cards use ambient shadow; hero hover deepens shadow. Chat bubble is a floating teal circle (higher elevation).

## Shapes
- Hero and cards: `rounded-2xl`; hero photo `rounded-t-2xl` or full-bleed inside overflow-hidden.
- Search and pills: `rounded-full` or `rounded-lg`.
- Avatar: `rounded-full`.
- Status badges: pill.

## Components

### Top Navigation
YATRIK mark + wordmark. Links: Dashboard, My Trips, Explore. Plan/itinerary/create/destinations highlight **My Trips**. Search placeholder “Search place or user…”. Bell panel shows `notice`. Avatar dropdown: Profile, Log out.

### Footer
Brand blurb, language select, product/resource links, store badges.

### Help Chat Bubble
Fixed bottom-right, chat icon, aria-label Help and Support.

### Dashboard Header
Greeting + contextual subtitle. **Browse Destinations** (muted) and **Plan New Trip** (solid teal + plus).

### Hero Trip Card
City photo (kyoto/lisbon/reykjavik/marrakech mapping), live temperature overlay, Confirmed / In progress badge, date range, title, description. Entire card opens itinerary.

### Flight Card
Kicker + path OUT → city code/date. Empty state prompts opening itinerary.

### Checklist
Shows 3 of 5 items; “n of 5 done”; checkboxes persist in `localStorage` (`gt-checklist-{tripId}`).

### Buttons & Inputs
Primary teal / white. Search input: 1px border, 2px teal focus.

## Features

- **Session shell** — All logged-in pages render inside AppShell.
- **Navigate** — Dashboard, My Trips, Explore (destinations/plan), Profile, Log out (clears JWT and user).
- **Search trips** — Submit search → My Trips filtered by name/description.
- **Notifications** — Bell shows dashboard notice (e.g. “Your trip to {city} is in N days.”).
- **Load upcoming trip** — `listTrips` + pick soonest future (or latest); load stops and first transport activity.
- **Live weather** — Open-Meteo geocode + current temp for first city.
- **Open itinerary** — Hero / “View full itinerary” sets current trip and goes to itinerary (or create if none).
- **Browse destinations / Plan new trip** — Route to those screens.
- **Checklist** — Toggle and persist locally (not on Postgres).
- **Empty / error / loading** — Copy for no trips, API failure, and boot “Connecting to Yatrik API…”.
- **Chat / store / footer links** — Visual.