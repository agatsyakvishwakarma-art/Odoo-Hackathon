# UI reference — Destinations

**Screen:** `destinations`  
**File:** `client/src/screens/DestinationsScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Pick a city to prefill Create trip (`name` + `description`).

## Layout

```
Browse destinations
Pick a city to start a trip…

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Kyoto    │ │ Lisbon   │ │ Reykjavik│ │ Marrakech│
│ Japan    │ │ Portugal │ │ Iceland  │ │ Morocco  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

12-column gallery: 4 cards desktop, 2 tablet, 1 mobile. Cards `rounded-2xl`, image `rounded-t-2xl` / overflow hidden.

## Destination cards

| City | Country | Image | Blurb |
| --- | --- | --- | --- |
| Kyoto | Japan | `/dashboard/kyoto.jpg` | Temples, bamboo groves, and tea ceremonies. |
| Lisbon | Portugal | `/dashboard/lisbon.jpg` | Trams, miradouros, and Atlantic light. |
| Reykjavik | Iceland | `/dashboard/reykjavik.jpg` | Hot springs, basalt coasts, and long golden hours. |
| Marrakech | Morocco | `/dashboard/marrakech.jpg` | Souks, riads, and the Atlas on the horizon. |

Each card: photo, `headline-md` city + `body-sm` country, blurb.

## Interactions

Click → Create trip with `name: "{City} trip"` and description = blurb.
