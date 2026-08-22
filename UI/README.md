# Yatrik UI references

Screen-by-screen specs for GlobeTrotter (branded **Yatrik**). Tokens, type, radius, and elevation live in [`DESIGN01.md`](./DESIGN01.md) (Voyage Flux Desktop). `DESIGN02.md`–`DESIGN06.md` are the same token set; use the page files below for layout and components.

| Page | Route / screen id | Source | UI reference |
| --- | --- | --- | --- |
| Landing | unauthenticated home | `LandingScreen.jsx` | [LANDING.md](./LANDING.md) |
| Auth | login / signup | `AuthScreen.jsx` | [AUTH.md](./AUTH.md) |
| App chrome | logged-in shell | `AppShell.jsx` | [APP-SHELL.md](./APP-SHELL.md) |
| Dashboard | `dashboard` | `DashboardScreen.jsx` | [DASHBOARD.md](./DASHBOARD.md) |
| My Trips | `trips` | `MyTripsScreen.jsx` | [MY-TRIPS.md](./MY-TRIPS.md) |
| Destinations | `destinations` | `DestinationsScreen.jsx` | [DESTINATIONS.md](./DESTINATIONS.md) |
| Create trip | `create` | `CreateTripScreen.jsx` | [CREATE-TRIP.md](./CREATE-TRIP.md) |
| Itinerary | `itinerary` | `ItineraryBuilderScreen.jsx` | [ITINERARY.md](./ITINERARY.md) |
| Budget | `budget` | `BudgetScreen.jsx` | [BUDGET.md](./BUDGET.md) |
| Profile / Passport | `profile` | `ProfileScreen.jsx` | [PROFILE.md](./PROFILE.md) |

## Shared rules (all authenticated pages)

- Font: **Inter**. Body text Deep Slate `#1F2937`. Page background `#F8F9FA`. Cards `#FFFFFF`.
- Primary CTA: teal `#14B8A6` / `#006B5F`, white label, `rounded-lg` (16px).
- Cards and panels: `rounded-2xl` (24px), ambient shadow 10px blur / 4% slate.
- Inputs: 1px neutral border; focus 2px teal + soft glow.
- Status chips: `rounded-full`.
- Brand mark: navy `#003366` + gold `#D4AF37` on the wordmark **YATRIK**.
