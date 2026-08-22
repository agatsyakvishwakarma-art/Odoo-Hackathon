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

# Screen: Create Trip + Itinerary Builder

**Source:** `client/src/screens/CreateTripScreen.jsx`, `client/src/screens/ItineraryBuilderScreen.jsx`  
**Screen ids:** `create`, `itinerary`

## Brand & Style
Planning tools are the densest Voyage Flux screens: **systematic containers**, generous field spacing, and a split view for the itinerary. Create Trip feels like a setup wizard (essentials + cover + style). Itinerary feels like a live log: timeline on the left, capture forms on the right. Personality stays lightweight — teal waypoints and chips, never a cluttered spreadsheet.

## Colors
- **Primary (Teal):** Save & Start Planning, Add stop, Add activity, active travel-style chip, timeline rail (2px), waypoint circles.
- **Neutral Surface:** Gray page, white `rounded-2xl` cards.
- **Category chips:** Tinted per activity category (`transport`, `stay`, `activities`, `meals`).
- **Error:** `#BA1A1A` under forms.
- **Draft pill:** Muted outline, not a second primary.

## Typography
**Inter** only.

- Create hero: kicker `label-sm` + `headline-lg` “New Adventure”.
- Card titles: `headline-sm` / `headline-md`. Card sub: `body-sm`.
- Itinerary page title: trip `headline-lg`; date range `body-md`.
- Stop titles: `headline-sm` (“1. Kyoto”). Field labels: `label-md`.

## Layout & Spacing
- **Create:** Hero band, then two columns (essentials | cover + style), sticky/footer actions Cancel + Save. 24px column gap, 12px field gap.
- **Itinerary:** **40/60 or 50/50 split** — scrollable timeline | stacked Add stop + Add activity cards.
- Desktop 48px margins; tablet stacks split; mobile single column, forms below timeline.

## Elevation & Depth
Cards rest on ambient shadow. Timeline is flat with a teal spine. Focus is communicated by input glow, not extra card elevation. Dropzone uses a dashed outline instead of a fill.

## Shapes
- Cards and dropzone: `rounded-2xl`.
- Inputs, textarea, primary buttons: `rounded-lg`.
- Style chips and activity chips: `rounded-full`.
- Timeline nodes: `rounded-full` on a 2px teal vertical line.

## Components

### Create hero
Kicker “CREATE NEW ITINERARY”, title, **Auto-saving drafts…** pill (visual).

### Trip Essentials
Name (pin icon), start/end dates (calendar icons), description textarea.

### Cover Photo
Dashed dropzone, JPG/PNG/WEBP, max 5MB copy (visual).

### Travel Style
Chips: Leisure, Adventure, Business, Family, Cultural. Pace range Relaxed → Packed (UI state).

### Create actions
Ghost Cancel. Primary Save & Start Planning + arrow; pending “Saving…”.

### Itinerary timeline
Stops with sequence, city, dates; activity chips (name · minutes · cost). Empty copy if none.

### Add stop form
City, arrival, departure, sequence, submit.

### Add activity form
Assign to city, name, category select, cost, duration, notes, submit.

### Buttons & Inputs
Teal primary. 1px border → 2px teal focus + glow.

## Features

- **Create trip** — `POST /trips` with name, startDate, endDate, description; creator becomes `trip_members` owner; then open itinerary.
- **Prefill from destinations** — Name and description from picked city.
- **Cancel** — Discard draft, return to My Trips.
- **Validation** — Required name and dates; server 400 if missing; `end_date >= start_date` in schema.
- **List stops** — `GET /trips/:id/stops` ordered by sequence.
- **Add stop** — City, arrival, departure, sequence; unique sequence per trip.
- **List / add activities** — Per stop: name, category (`transport|stay|activities|meals`), cost, duration, notes.
- **Membership** — Stop/activity routes require authenticated trip member.
- **Guard** — Activity submit blocked until a stop exists.
- **Cover upload, auto-save, style, pace** — UI only (not stored on Postgres).
- **Map focus panel** — Design-system right panel is forms here, not a live map.