# UI reference — Itinerary builder

**Screen:** `itinerary` (requires selected `trip`)  
**File:** `client/src/screens/ItineraryBuilderScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Split planning: timeline of stops/activities vs add-stop / add-activity forms.

## Layout (40/60 or 50/50)

```
{trip.name}
{startDate} → {endDate} · {description}

┌──────────────────────┬─────────────────────┐
│ Timeline             │ Add stop            │
│ 1. City              │ city, dates, seq    │
│    dates             │ [Add stop]          │
│    activity chips    │                     │
│                      │ Add activity        │
│                      │ assign, name, cat,  │
│                      │ cost, duration      │
│                      │ [Add activity]      │
└──────────────────────┴─────────────────────┘
```

Matches Voyage Flux **Split-View Planning Panels**: left scroll timeline, right focus forms.

## Timeline

- Vertical **2px teal** connector (design system).
- Each stop: sequence + city (`headline-sm`), arrival → departure.
- Activities as **pills** (`vf-chip-{category}`): name · minutes · cost.
- Empty: “No stops yet…” / “No activities yet”.

## Forms

**Add stop:** City, arrival, departure (2-col), sequence number, primary button.

**Add activity:** Assign to city (select), name, category select, cost + duration 2-col, notes textarea, primary button.

Disabled submit while pending (“Adding…”). Activity requires a stop (“Add a stop before assigning an activity”).

## Tokens

- Primary buttons teal.
- Inputs 1px → 2px teal focus.
- Cards `rounded-2xl`.
- Category chips `rounded-full`.
