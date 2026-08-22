# UI reference — Create trip

**Screen:** `create`  
**File:** `client/src/screens/CreateTripScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Create a trip (name, dates, description) then open itinerary. Style chips and pace slider are UI-only unless API is extended.

## Layout

```
CREATE NEW ITINERARY          [Auto-saving drafts...]
New Adventure

┌─────────────────────────┬─────────────────────────┐
│ Trip Essentials         │ Cover Photo dropzone    │
│ Name, dates, notes      │ Travel Style chips      │
│                         │ Pace slider             │
└─────────────────────────┴─────────────────────────┘
              [Cancel]  [Save & Start Planning →]
```

Two-column `gt-create-layout`. Hero band with kicker + `headline-lg`.

## Components

| Element | Spec |
| --- | --- |
| Draft pill | Ghost pill, document icon, “Auto-saving drafts…” |
| Cards | White, `rounded-2xl`, title + subtitle |
| Name | Pin icon prefix |
| Dates | Two fields, calendar icons, `type="date"` |
| Dropzone | Dashed border, JPG/PNG/WEBP, max 5MB (visual) |
| Chips | Leisure, Adventure, Business, Family, Cultural; active = teal fill, `rounded-full` |
| Pace | Range 0–100; labels Relaxed / Moderate / Packed |
| Cancel | Ghost |
| Save | Primary teal + arrow; pending “Saving…” |

## Prefill

From Destinations: `initial.name`, `initial.description`.

## Interactions

- Cancel → My Trips (clears draft).
- Submit → `createTrip` → itinerary for the new trip.
- Error under form (`vf-error`).
