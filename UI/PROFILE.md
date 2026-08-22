# UI reference — Profile / Passport

**Screen:** `profile`  
**File:** `client/src/screens/ProfileScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Traveler “passport”: stats, milestones, map teaser, climate/status. Export downloads trip JSON.

## Layout

```
DIGITAL (watermark)
Passport [Active]              [Share Profile] [Export Data]
A comprehensive record…

┌─────────────────────┬──────────────────────────────┐
│ Global Stats        │ Map (zoom + − · center)      │
│ 2×2 metric boxes    │ NEXT DESTINATION Reykjavík   │
│ World Explorer bar  │                              │
│                     ├──────────────┬───────────────┤
│ Milestones          │ Tropical     │ Passport Valid│
│ timeline items      │ climate      │ ring 75%      │
└─────────────────────┴──────────────┴───────────────┘
```

## Header

- `headline-lg` “Passport” + pill **Active**.
- Ghost **Share Profile** (visual). Primary **Export Data** → `globetrotter_export.json` (`listTrips`).

## Global Stats

| Label | Value treatment |
| --- | --- |
| Countries | 24 / 195 |
| Flights | 87, coral/red accent |
| Miles | 142K, orange |
| CO2 Offset | 94% |
| Tier | World Explorer, 80% teal bar, “6,400 pts to Elite” |

Placeholder numbers until API exists.

## Milestones

- Icon circles (teal / coral).
- Date, title, description (e.g. Equator, Machu Picchu).
- **View All** text link.

## Map panel

- Zoom / pan controls (visual).
- Overlay: NEXT DESTINATION, **Reykjavík**, “In 14 days”.

## Bottom cards

- Climate Preference → Tropical.
- Passport Status → Valid Exp: 2028 + 75% ring (`#0F766E`).
