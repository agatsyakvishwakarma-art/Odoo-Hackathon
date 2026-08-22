# UI reference — My Trips

**Screen:** `trips`  
**File:** `client/src/screens/MyTripsScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

List the user’s trips. Header search filters name/description.

## Layout

```
Upcoming Trips
Your next adventures await.

┌──────────────────────┬─────────────────┐
│ Featured (trip[0])   │ Secondary [1]   │
│ large image, badge   │ image overlay   │
│ dates, avatars, CTA  │ desc + arrow    │
│ 25% Planned bar      │                 │
└──────────────────────┴─────────────────┘

Past Trips                         View All
┌────────┐ ┌────────┐ ┌────────┐
│ card   │ │ card   │ │ card   │   (trip[2+])
└────────┘ └────────┘ └────────┘
```

Trip gallery: featured + one secondary, then 3-up past cards (design system: 3–4 columns).

## Components

| Element | Spec |
| --- | --- |
| Title | `headline-lg` “Upcoming Trips” |
| Featured | Image `/login/alps.jpg`, pill badge “In 14 days”, calendar dates, avatar, **View Itinerary**, 25% progress |
| Secondary | `/dashboard/tokyo.jpg`, title + dates on image, description, chevron |
| Past cards | bali / paris / marrakech cycling; name + start date |
| Empty | White card, copy, **New trip** primary button |

## States

- Loading: “Loading trips…”
- Error: `vf-error`
- Empty list vs empty search (“No trips matched that search.”)

## Interactions

- Featured / secondary / past → open itinerary for that trip.
- New trip → create screen.
- View All: visual until wired.
