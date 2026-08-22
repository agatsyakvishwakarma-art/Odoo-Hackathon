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

# Screen: Landing (unauthenticated)

**Source:** `client/src/screens/LandingScreen.jsx`  
**Chrome:** Full-bleed marketing page. No AppShell.

## Brand & Style
The landing page is an **optimistic, editorial** introduction to Yatrik. It keeps the Voyage Flux **Minimalist / Modern Corporate** system but uses more white space, a larger hero, and social proof instead of dense planning tools.

Personality is navigational and lightweight: one clear promise (“One app for all your travel planning needs”), two primary actions, then traveler reviews. The YATRIK wordmark (navy `#003366`, gold `#D4AF37` on the letter A) is the brand lockup above the product teal.

## Colors
The color palette is anchored by a vibrant **Teal (#14B8A6)** for Sign up and Start planning.

- **Primary (Teal):** Sign up, Start planning, and other conversion CTAs.
- **Navy / Gold:** Logo mark and wordmark only (not used for body text at scale).
- **Secondary (Coral):** Unused on this page except as a future “delight” accent.
- **Neutral Surface:** Page reads as a bright marketing canvas; review cards sit on **White (`#FFFFFF`)** against a soft gray field (`#F8F9FA`).
- **Star gold `#FFB400`:** Five-star ratings on review cards.

## Typography
**Inter** is the exclusive typeface.

- Hero title uses `headline-xl` (48px / 700 / −0.02em).
- Hero subtitle uses `body-lg` (18px / 28px).
- Section title “What travelers are raving about” uses `headline-lg`.
- Review names are `label-md`; quotes are `body-sm` / `body-md`.
- Logo lockup is display letter-spacing (YATRIK 20px / 800); tagline is 7px uppercase.

## Layout & Spacing
Fixed-fluid marketing layout, max content ~1440px, 48px desktop margins.

- **Top bar:** Logo + tagline left; text links (Home, Travel guides, Hotels); Log in (flat) + Sign up (solid) right.
- **Hero:** Copy column + large media with caption (“Your itinerary and your map in one view”).
- **Reviews:** Masonry of six quote cards, 24px gutters, 40px section gap.
- **Breakpoints:** Desktop 1280px+; tablet 768–1279px stacks hero media under copy; mobile &lt;768px, 16px margins, stacked nav actions.

## Elevation & Depth
Review cards rest on ambient shadow (10px blur, 4% slate). Hero media is a large rounded container with a caption block overlapping or sitting below. Nav is flat (no floating sidebar). Hover on cards increases shadow to 20px / 8%.

## Shapes
- Hero media and review cards: `rounded-2xl` (24px).
- Buttons: `rounded-lg` (16px); large CTAs keep the same radius with extra padding.
- Avatars: `rounded-full`.
- Photos: `overflow-hidden` matching parent radius.

## Components

### Marketing Navbar
Logo mark (32px) + YATRIK + tagline “Journey Beyond Limits”. Right cluster: flat **Log in**, solid teal **Sign up**.

### Hero
`headline-xl` promise, supporting paragraph, **Start planning** (primary) and **Get the app** (outline + arrow).

### Hero Media
Destination photograph with caption title + body explaining itinerary and map in one view.

### Review Card
Circular initial avatar, name, optional role, five gold stars, quote body. White `surface-white` container.

### Buttons & Inputs
Primary = solid Teal / White text. Outline = 1px neutral border. No form fields on this screen.

## Features

- **Open Log in** — Sets auth mode to login and shows Auth screen.
- **Open Sign up / Start planning** — Sets auth mode to signup and shows Auth screen.
- **Marketing navigation** — Home, Travel guides, Hotels (visual links).
- **Get the app** — Visual CTA (store flow not wired).
- **Social proof** — Six static traveler reviews with 5-star ratings.
- **No session** — This screen is shown only when no JWT/user is stored.