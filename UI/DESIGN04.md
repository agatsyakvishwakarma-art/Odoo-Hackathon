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

# Screen: My Trips + Destinations

**Source:** `client/src/screens/MyTripsScreen.jsx`, `client/src/screens/DestinationsScreen.jsx`  
**Screen ids:** `trips`, `destinations`

## Brand & Style
These screens are **gallery-first**. My Trips is a personal archive (featured next trip, secondary card, past grid). Destinations is inspiration: four city posters that start a trip. Both use structured white cards, destination photography, and teal only on primary actions and active chrome. Information density stays low so images carry the destination emotion.

## Colors
- **Primary (Teal):** New trip, View Itinerary, View All, destination hover/focus, progress fill.
- **Neutral Surface:** `#F8F9FA` page; white cards.
- **Deep Slate:** Titles and dates.
- **On-image white:** Overlay titles on secondary and past cards.
- **Progress:** Teal fill on a light track (featured card 25% Planned — display value).

## Typography
**Inter** only.

- Page titles: `headline-lg` (“Upcoming Trips”, “Browse destinations”).
- Subtitles: `body-md`.
- Featured title: `headline-md`.
- Past card name: `label-md`; date `body-sm`.
- Destination city `headline-md` + country `body-sm` + blurb `body-sm`.

## Layout & Spacing
12-column content, 24px gutters, 48px desktop margins.

- **My Trips:** Featured + secondary in a 2-column band; **Past Trips** heading + 3–4 cards per row.
- **Destinations:** 4 columns desktop, 2 tablet, 1 mobile.
- **Empty:** Single white card + primary button, not a blank page.

## Elevation & Depth
Gallery cards rest (10px / 4%). Hover = 20px / 8% and slight lift. Image overlays use a dark gradient so white type stays readable. Nav remains the AppShell top bar (flat).

## Shapes
- All trip and destination cards: `rounded-2xl`.
- Images: `rounded-t-2xl` or full card `overflow-hidden`.
- “In 14 days” and itinerary CTA: `rounded-full` / `rounded-lg`.
- Avatars on featured footer: `rounded-full`.

## Components

### Upcoming header
Title + “Your next adventures await.” Header search (shell) filters this list.

### Featured trip card
Large image (`/login/alps.jpg`), countdown badge, `headline-md` name, date row with calendar icon, collaborator avatar, **View Itinerary**, progress bar + “25% Planned”.

### Secondary trip card
`/dashboard/tokyo.jpg`, title and dates on overlay, short description, chevron.

### Past trip cards
Cycling images (bali, paris, marrakech), name + start date. **View All** text control.

### Destination card
Photo, city + country, blurb. Clickable button covering the card.

### Empty / error
Loading line; error text; empty copy + **New trip**.

### Buttons & Inputs
Primary teal for New trip. Cards themselves are the hit target.

## Features

- **List member trips** — `GET /trips` for the signed-in user (owner/editor via `trip_members`).
- **Search filter** — Client filter on name and description from shell search.
- **Open trip** — Featured, secondary, or past card sets `trip` and opens itinerary.
- **Create from empty** — **New trip** → create screen.
- **Browse destinations** — Kyoto, Lisbon, Reykjavik, Marrakech with local images.
- **Prefill create** — Picking a city sets draft `{ name: "{City} trip", description: blurb }` and navigates to create.
- **View All / countdown badge** — Visual (badge text is static “In 14 days”).
- **Progress percent** — Visual 25%, not computed from stops/activities.