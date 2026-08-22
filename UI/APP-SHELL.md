# UI reference — App shell

**Screen:** all authenticated pages  
**File:** `client/src/components/AppShell.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)

## Purpose

Fixed chrome: top nav, main content, footer, help bubble. Nav does **not** use a 280px left sidebar (product uses a top bar instead of the design-system sidebar).

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│ YATRIK   Dashboard · My Trips · Explore    [search] 🔔  👤  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Main (page content)                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer: brand · Product · Resources · Get the App           │
└─────────────────────────────────────────────────────────────┘
                                              [chat bubble]
```

## Top nav

| Item | Spec |
| --- | --- |
| Brand | 32px mark + YATRIK navy/gold + 7px tagline |
| Links | Dashboard, My Trips, Explore |
| Active | Teal underline or teal text (`is-active`). Plan/itinerary/create/destinations highlight **My Trips** |
| Search | Pill field, search icon, placeholder “Search place or user…” Submit → My Trips filtered |
| Bell | Badge dot; panel shows `notice` or “No new notifications.” |
| Avatar | `/login/avatar.jpg`; dropdown Profile / Log out |

## Footer

Four columns: brand + blurb + language select; Product; Resources; store badges. White/light surface, 1px top border `#E5E7EB`.

## Chat bubble

Fixed bottom-right, teal circle, chat icon, `aria-label` Help and Support.

## Breakpoints

- **≥1280px:** full links + search.
- **768–1279px:** compress search; keep brand.
- **&lt;768px:** hamburger or icon links; search in overlay; bottom padding so chat does not cover CTAs.
