const NAV = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 4h7v9H4V4zm9 0h7v5h-7V4zM4 15h7v5H4v-5zm9-4h7v9h-7v-9z"
        />
      </svg>
    ),
  },
  {
    id: 'trips',
    label: 'My Trips',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7h3zm2 0h8V5H8v2z"
        />
      </svg>
    ),
  },
  {
    id: 'create',
    label: 'New trip',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" />
      </svg>
    ),
  },
  {
    id: 'itinerary',
    label: 'Itinerary',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5z"
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
        />
      </svg>
    ),
  },
]

export default function AppShell({ user, active, onNavigate, children }) {
  return (
    <div className="vf-app">
      <aside className="vf-sidebar">
        <div className="vf-brand">
          <div className="vf-brand-mark">VF</div>
          <span>Voyage Flux</span>
        </div>
        <nav className="vf-nav" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`vf-nav-item ${active === item.id ? 'is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="vf-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <p className="vf-user">{user?.name}</p>
      </aside>
      <main className="vf-main">{children}</main>
    </div>
  )
}
