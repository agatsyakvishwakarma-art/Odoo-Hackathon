# UI reference — Landing

**Screen:** unauthenticated marketing home  
**File:** `client/src/screens/LandingScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** full-bleed page (no AppShell)

## Purpose

Convert visitors to Sign up / Log in. Hero + social proof only; no trip data.

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Mark] YATRIK    Home · Travel guides · Hotels    Log in  Sign up │
├─────────────────────────────────────────────────────────────┤
│  H1 One app for all your travel planning needs              │
│  Subtitle · [Start planning] [Get the app →]                │
│                                                             │
│  ┌───────────────────────────────┐                          │
│  │ Hero image                    │                          │
│  │ Caption: itinerary + map      │                          │
│  └───────────────────────────────┘                          │
│                                                             │
│  What travelers are raving about                            │
│  ┌────┐ ┌────┐ ┌────┐  masonry review cards                 │
└─────────────────────────────────────────────────────────────┘
```

- **Navbar:** logo + tagline left; text links; right: flat **Log in**, solid **Sign up**.
- **Hero:** `headline-xl` (48px / 700) title, `body-lg` subtitle, two large buttons.
- **Reviews:** 6 quote cards in masonry. Avatar initial, 5 gold stars `#FFB400`, body quote.

## Components

| Element | Spec |
| --- | --- |
| Logo | 32px mark, YATRIK 20px / 800, letter-spacing 3px, gold **A** |
| Tagline | 7px uppercase, navy, “Journey Beyond Limits” |
| Primary button | Teal fill, white text, large padding, `rounded-lg` |
| Outline button | Neutral border, arrow icon after label |
| Review card | White surface, `rounded-2xl`, ambient shadow |
| Avatar | Circle, initial of name |

## Interactions

- **Log in** → Auth in login mode.
- **Sign up** / **Start planning** → Auth in signup mode.
- **Get the app**, nav links: visual only unless wired.

## Tokens to use

- Navy brand `#003366`, gold `#D4AF37`.
- Primary teal for Sign up / Start planning.
- Page may use a lighter marketing surface; authenticated app still uses `#F8F9FA`.
