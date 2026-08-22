# UI reference — Budget

**Screen:** `budget`  
**File:** `client/src/screens/BudgetScreen.jsx`  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** [APP-SHELL.md](./APP-SHELL.md)

## Purpose

Roll up activity costs across trips: total, category donut, searchable transactions.

## Layout

```
Financial Overview
All Trips 2024                         [USD ($)] [+ Add Expense]
Track your expenses…

┌────────────────────┬───────────────────────────────────────┐
│ Total Spent $      │ Transactions                          │
│ Budget progress    │ [Search] [filter]                     │
│                    │ DESCRIPTION CATEGORY LOCATION AMOUNT  │
│ Breakdown donut    │ grouped by trip name                  │
│ category list      │                                       │
└────────────────────┴───────────────────────────────────────┘
```

## Header

- Kicker “Financial Overview”, `headline-lg` “All Trips 2024”.
- Currency select (visual). **Add Expense** → plan/itinerary (`onNavigate('plan')`).

## Summary card

- Total spent: large numeral + cents.
- Progress vs hardcoded **$5,000** budget; “%” and “$ left”.
- Teal progress fill.

## Donut / breakdown

- SVG donut, center “N CATEGORIES”.
- Legend: Flights `#0F766E`, Accommodation `#9F1239`, Food `#FB923C`, Transport `#FBBF24`, Activities amber.
- Rows: name, `$`, `%`.

## Transactions

- Search filters by activity name.
- Groups by `tripName`.
- Row: category icon, name, pill, city, `$amount`.

## Empty / loading

- “Loading costs…”
- No costs: card + **Plan a trip**.
- Error: `vf-error`.
