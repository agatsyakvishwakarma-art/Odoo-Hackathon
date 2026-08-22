# UI reference — Dashboard

**Screen:** `dashboard` (default after login)  
**File:** `client/src/screens/DashboardScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Greet the user, surface the next trip, flight snippet, and a short pre-trip checklist.

## Layout

```
Welcome back, {firstName}.
Subtitle (countdown / empty / error)
                    [Browse Destinations]  [+ Plan New Trip]

Up Next                              View full itinerary →
┌────────────────────────────┬─────────────────────┐
│ Hero trip image            │ Departure flight    │
│ Weather · badges · title   │ Checklist (3 items) │
└────────────────────────────┴─────────────────────┘
```

- Hero + side stack: ~60/40 on desktop (`gt-upnext-grid`).
- Hero image from city map (`/dashboard/kyoto.jpg`, lisbon, reykjavik, marrakech).

## Components

| Element | Spec |
| --- | --- |
| H1 | `headline-lg` “Welcome back, {name}.” |
| Muted pill | Browse Destinations (outline / muted) |
| Solid pill | Plan New Trip, teal + plus icon |
| Hero card | `rounded-2xl`, image top, fade overlay, clickable |
| Weather | `{temp}° CITY` overlay |
| Badges | Muted “Confirmed” / “In progress”; teal date range with ✈ |
| Flight card | Kicker DEPARTURE FLIGHT; OUT → city code + date line |
| Checklist | PRE-TRIP CHECKLIST, “n of 5 done”, first 3 rows, checkboxes persist in `localStorage` |

## Empty / loading

- Loading: “Loading your trips from the server…”
- No trips: hero “No trip on the board”; click → Create trip.
- No transport activity: empty flight card + “Open itinerary”.
- Shell notice: “Your trip to {city} is in N days.”

## Interactions

- Hero / View full itinerary → open trip itinerary (or create if none).
- Browse Destinations → destinations screen.
- Plan New Trip → create screen.
- Checklist toggle saved per `gt-checklist-{tripId}`.
