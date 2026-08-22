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

Screen-by-screen UI references: [README.md](./README.md).

## Brand & Style
The design system transitions from a mobile-first approach to a robust, **Modern Corporate** desktop experience. It maintains a **Minimalist** foundation that prioritizes high-density information management without sacrificing the "navigational, optimistic, and lightweight" personality. 

The desktop environment is characterized by expansive white space and a "live" interface that feels like a professional productivity tool for travelers. The aesthetic is clean and systematic, utilizing structured containers to organize complex multi-day itineraries and logistical data into a cohesive, breathable interface.

## Colors
The color palette is anchored by a vibrant **Teal (#14B8A6)**, serving as the primary driver for navigation, active states, and focus indicators. 

- **Primary (Teal):** The core brand anchor. Used for primary CTAs, sidebar active states, and timeline waypoints.
- **Secondary (Coral):** Reserved for "delight" moments, seasonal highlights, or secondary interactive elements.
- **Neutral Surface:** A soft gray (`#F8F9FA`) background reduces eye strain during long-form planning, while **Deep Slate (#1F2937)** is the standard for high-legibility typography.
- **Container Strategy:** White (`#FFFFFF`) is used for primary content containers (cards, sidebars, panels) to create a clear visual distinction against the neutral background.

## Typography
**Inter** is the exclusive typeface, chosen for its neutral, systematic character and excellent legibility at all scales. 

The desktop hierarchy is more expansive than mobile, introducing `headline-xl` at 48px for major destination landing pages. Desktop-specific adjustments focus on generous line heights for body text to maintain readability across wider content blocks. Functional labels use semibold weights to differentiate interactive UI elements from editorial descriptions.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model optimized for travel productivity.

- **Sidebar Navigation:** A fixed 280px sidebar on the left handles primary navigation and trip switching.
- **12-Column Grid:** The main content area utilizes a 12-column grid with 24px gutters. For trip galleries, use a multi-column grid (3 or 4 cards per row).
- **Split-View Layouts:** For planning tools, the screen is split 40/60 or 50/50 between an itinerary list and a map/media panel.
- **Breakpoints:**
  - **Desktop:** 1280px+ (12 columns, 48px margins)
  - **Tablet:** 768px - 1279px (8 columns, 24px margins, sidebar collapses to an icon rail)
  - **Mobile:** <768px (4 columns, 16px margins, bottom navigation)

## Elevation & Depth
This design system uses **Tonal Layering** combined with **Ambient Shadows** to define hierarchy.

- **Surface Tiers:** The base layer is the soft gray background. Primary content lives on white `surface-white` containers.
- **Ambient Shadows:** Cards and panels use a very diffused, low-opacity shadow (10px blur, 4% opacity, Slate tint) to feel "resting." 
- **Interactive Depth:** On hover, elements transition to a more pronounced shadow (20px blur, 8% opacity) to provide tactile confirmation.
- **Navigation Depth:** The sidebar remains flat or uses a subtle 1px border (`#E5E7EB`) to feel integrated into the application frame rather than floating.

## Shapes
The design maintains a **Rounded** aesthetic to feel approachable and modern. 

- **Main Containers:** All cards, trip modals, and planning panels use `rounded-2xl` (1.5rem / 24px) for a soft, professional look.
- **Interactive Elements:** Buttons and form inputs use `rounded-lg` (1rem / 16px).
- **Media:** Thumbnails and photos must always match the corner radius of their parent container (using `overflow-hidden`) or default to `rounded-xl`.
- **System Icons:** Status badges and category chips use a full pill shape (`rounded-full`) to differentiate them from square-ish action buttons.

## Components

### Sidebar Navigation
The desktop sidebar uses the `surface-white` background. Active states are indicated by a Primary Teal vertical bar on the left edge and a low-opacity teal background fill for the menu item.

### Trip Cards
Desktop trip cards feature a multi-column layout. They include a `headline-md` title, a `body-sm` date range, and a full-width image at the top with `rounded-t-2xl` corners.

### Split-View Planning Panels
Planning tools utilize a vertical split. The left panel contains the scrollable itinerary timeline, while the right panel (the "Focus Panel") displays high-resolution maps or destination details.

### Buttons & Inputs
Primary buttons are solid Teal with White text. Inputs use a 1px neutral border that transforms into a 2px Teal border with a soft outer glow on focus.

### Itinerary Timeline
A vertical 2px Teal line connects travel waypoints. Each waypoint is a `rounded-full` circle, often containing a category icon (e.g., plane, hotel, or fork/knife).