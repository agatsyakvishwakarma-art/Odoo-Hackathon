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

# Screen: Budget + Profile (Passport)

**Source:** `client/src/screens/BudgetScreen.jsx`, `client/src/screens/ProfileScreen.jsx`  
**Screen ids:** `budget`, `profile`

## Brand & Style
These screens are **analytics and identity**. Budget is a financial overview: total spent, category donut, transaction table. Profile is framed as a **digital passport** — stats, milestones, map teaser, climate and document status. Both keep white cards on `#F8F9FA`, teal for progress/rings, and coral/orange for secondary metrics (flights, food). High-density numbers sit in breathable containers so the UI still feels lightweight.

## Colors
- **Primary (Teal `#0F766E` / `#14B8A6`):** Budget progress, donut Flights segment, passport ring, Export Data, Active badge.
- **Accommodation:** `#9F1239` (secondary/coral family).
- **Food & Drink:** `#FB923C` (tertiary/warm).
- **Transport / Activities:** `#FBBF24` (warning amber).
- **Critical red / orange:** Profile “Flights” and “Miles” accents.
- **Neutral:** White cards, Deep Slate labels, gray secondary figures (“/ 195”).

## Typography
**Inter** only.

- Budget kicker `label-sm` “Financial Overview”; H1 `headline-lg` “All Trips 2024”.
- Total spent: oversized numeral (display) + cents `body-md`.
- Table headers: `label-sm` uppercase.
- Passport H1 `headline-lg` + Active pill; stats values `headline-md`; milestone dates `label-sm`.

## Layout & Spacing
- **Budget:** Header row (copy | currency + Add Expense). Body **~40/60**: summary + donut | transactions. 24px gap.
- **Passport:** Header (title | Share + Export). Body **~45/55**: stats + milestones | map + climate/status row.
- Desktop 48px margins; tablet stacks columns; mobile single column, table becomes stacked rows.

## Elevation & Depth
Summary, donut, and transaction cards rest with ambient shadow. Map panel is a media container (image/texture) with floating control cluster. Ring charts are flat SVG (no fake 3D). Share is ghost; Export is solid (higher visual weight).

## Shapes
- All panels: `rounded-2xl`.
- Currency and Add Expense: `rounded-lg`.
- Category pills: `rounded-full`.
- Map zoom buttons: round or `rounded-lg`.
- Passport Active badge: pill.

## Components

### Budget header
Kicker, title, description. USD select (visual). **Add Expense** → plan/itinerary.

### Total Spent card
Amount, budget progress vs **$5,000** (display cap), remaining copy.

### Breakdown
SVG donut, center “N CATEGORIES”, legend with color dots, amount and %.

### Transactions
Search expenses, filter icon (visual), columns Description / Category / Location / Amount, grouped by trip name, category icon + pill.

### Passport header
Watermark “DIGITAL”, title, Active, supporting copy, Share Profile (ghost), Export Data (primary).

### Global Stats
Countries, Flights, Miles, CO2 Offset, World Explorer progress bar.

### Milestones
Icon + date + title + description; View All.

### Map teaser
Zoom in/out/center. Overlay NEXT DESTINATION Reykjavík, “In 14 days”.

### Status pair
Climate Preference (Tropical). Passport Valid Exp 2028 + 75% ring.

### Buttons & Inputs
Teal primary. Search field 1px → 2px teal focus.

## Features

- **Aggregate costs** — Load all member trips → stops → activities; include rows with `cost`; sum total.
- **Category breakdown** — Group into Flights, Accommodation, Food & Drink, Activities, Transport (mapped from activity `category` where possible).
- **Budget progress** — Percent of hardcoded $5,000 ceiling; remaining dollars.
- **Search transactions** — Filter by activity name.
- **Empty budget** — CTA Plan a trip if no costs.
- **Add Expense** — Navigates to plan (create or itinerary), does not open a ledger modal.
- **Export Data** — Downloads `globetrotter_export.json` from `listTrips`.
- **Profile identity** — Uses session `user` for shell; passport stats/milestones/map are **display placeholders** (not queried from Postgres).
- **Share Profile, currency, map zoom, filter** — UI only.
- **Collaboration roles** — Budget includes any trip the user is a member of (owner or editor).