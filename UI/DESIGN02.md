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

# Screen: Auth — Log in / Sign up

**Source:** `client/src/screens/AuthScreen.jsx`  
**Chrome:** Split hero + form. No AppShell.

## Brand & Style
Auth is a **calm productivity gateway**: left side is cinematic travel brand, right side is a high-clarity form. The page stays minimalist and systematic so credentials feel trustworthy. YATRIK lockup sits on the hero; the form speaks in Deep Slate with teal as the only strong action color.

Login and signup share one layout. Signup adds a Name field; copy and submit label swap. A “Traveler Journeys” card and “Did you know?” tip add delight without cluttering the form.

## Colors
- **Primary (Teal):** Log In / Sign Up submit, focus rings, text links (Sign Up / Log In switch).
- **Hero:** Photographic overlay; back control is white at 20% on imagery.
- **Error:** `#BA1A1A` / `#EF4444` for API and validation messages.
- **Neutral Surface:** Form panel is White on `#F8F9FA` context.
- **Social buttons:** White fill, outline `#BBCAC6`, brand logos for Google / Apple.

## Typography
**Inter** only.

- Hero headline: `headline-lg` / approaching `headline-xl` (“Your journey begins here.”).
- Panel title: `headline-md` / `headline-lg` (“Welcome back” / “Create your account”).
- Field labels: `label-md`. Helper and switch copy: `body-sm`.
- Journey overlay title: `headline-sm`. Tip body: `body-sm`.

## Layout & Spacing
Desktop **50/50 split**. Form column max-width inside the panel, 24px internal gutters, 12px between fields.

- Hero: brand lockup, optional Back to Home pill, marketing copy.
- Panel: welcome header → form → OR CONTINUE WITH → social row → mode switch → journey card → tip.
- Tablet: stack form first or keep split with reduced hero.
- Mobile: form-first, hero condensed or hidden below fold.

## Elevation & Depth
Form panel is a flat white surface (or light shadow at the split). Journey card uses ambient shadow and a dark gradient overlay for text. Inputs lift only via focus glow, not extra shadow.

## Shapes
- Inputs and primary submit: `rounded-lg` (16px).
- Back control and social buttons: pill or `rounded-lg`.
- Journey photo: `rounded-2xl` + `overflow-hidden`.
- Avatars in quote: `rounded-full`.

## Components

### Hero Brand
48px mark + YATRIK (`#003366` / gold A) + tagline. Headline and supporting paragraph.

### Back to Home
Absolute pill on hero; returns to Landing.

### Credential Form
Optional Name (signup). Email with mail icon. Password with lock, show/hide eye, Forgot Password (login only). Error line. Full-width teal submit with arrow; pending label “Please wait…”.

### Social Continue
Divider “OR CONTINUE WITH”. Google and Apple outline buttons (visual unless OAuth is wired).

### Mode Switch
Text + teal link toggles login ↔ signup and clears error.

### Traveler Journeys
Image `/login/alps.jpg`, overlay title, quote + `/login/avatar.jpg`.

### Did you know?
Lightbulb icon, bold kicker, short travel fact.

### Buttons & Inputs
1px outline → **2px teal + soft glow** on focus. Primary = teal fill / white text.

## Features

- **Sign up** — `POST /auth/signup` with name, email, password; bcrypt hash; JWT 7 days; persist token + user; enter AppShell.
- **Log in** — `POST /auth/login`; compare hash; same session persist.
- **Session restore** — Token in localStorage; `GET /auth/me` on boot; invalid token clears session.
- **Password visibility** — Toggle show/hide.
- **Duplicate email** — 409 “Email already registered”.
- **Invalid credentials** — 401 generic error (no user enumeration).
- **Required fields** — Browser + API 400 if missing.
- **Back to Landing** — Closes auth without destroying a session (none yet).
- **Google / Apple / Forgot Password** — UI only.