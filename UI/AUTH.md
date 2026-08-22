# UI reference — Auth (Log in / Sign up)

**Screen:** `showAuth` overlay on landing  
**File:** `client/src/screens/AuthScreen.jsx` (+ `AuthScreen.css`)  
**Design system:** [DESIGN01.md](./DESIGN01.md)  
**Chrome:** split layout, no AppShell

## Purpose

Authenticate. Login and signup share one layout; signup adds Name.

## Layout (desktop split)

```
┌─────────────────────────┬──────────────────────────┐
│ Hero (photo / brand)    │ White panel              │
│ [← Back to Home]        │ Welcome back / Create    │
│ YATRIK wordmark         │ Email, password, submit  │
│ Your journey begins     │ OR CONTINUE WITH         │
│ here.                   │ [Google] [Apple]         │
│                         │ Switch mode link         │
│                         │ Traveler Journeys card   │
│                         │ Did you know? tip        │
└─────────────────────────┴──────────────────────────┘
```

- Split ~50/50. Hero is visual; panel is the form (scroll if needed).
- Tablet/mobile: stack hero above panel or hide hero copy, keep form first.

## Components

| Element | Spec |
| --- | --- |
| Back | Pill, white 20% on hero, top-left |
| Welcome `h2` | `headline-lg` 32px / 600 |
| Fields | Label `label-md`; input `rounded-lg`, 1px border → 2px teal focus |
| Email / password | Leading mail / lock icons; eye toggle on password |
| Forgot Password | Text link, login only |
| Submit | Full-width teal, white text, login-arrow icon; disabled = “Please wait…” |
| Divider | Hairline + “OR CONTINUE WITH” |
| Social | Outline buttons, Google / Apple logos |
| Journey card | Image `/login/alps.jpg`, overlay title + quote + `/login/avatar.jpg` |
| Tip | Lightbulb icon, “Did you know?” + fact |

## States

- **Login:** Welcome back · Email · Password · Forgot · Log In · “New to Yatrik? Sign Up”
- **Signup:** Create your account · Name · Email · Password · Sign Up · “Already have an account? Log In”
- **Error:** `gt-error` under fields, coral/error `#BA1A1A` / `#EF4444`.

## Interactions

- Submit → `login` / `signup` API, then AppShell Dashboard.
- Back → Landing.
- Mode switch clears error, keeps email if present.
