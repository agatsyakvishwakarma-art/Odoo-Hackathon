function GlobeMark() {
  return (
    <span className="gt-sidenav-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#14b8a6" />
        <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="3" ry="7" stroke="#fff" strokeWidth="1.4" />
        <path d="M9 16h14M10.4 12.4h11.2M10.4 19.6h11.2" stroke="#fff" strokeWidth="1.3" />
      </svg>
    </span>
  )
}

const NAV = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'trips',
    label: 'My Trips',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <polygon points="12,3 14.5,9 21,12 14.5,15 12,21 9.5,15 3,12 9.5,9" />
      </svg>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    id: 'budget',
    label: 'Budget',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 10v4M18 10v4" />
      </svg>
    ),
  },
]

export default function AppShell({
  user,
  active,
  search,
  notice,
  onSearchChange,
  onSearch,
  onNavigate,
  onLogout,
  children,
}) {
  return (
    <div className="gt-shell">
      <aside className="gt-sidenav">
        <div className="gt-sidenav-brand">
          <GlobeMark />
          <span>GlobeTrotter</span>
        </div>
        <nav className="gt-sidenav-nav" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`gt-sidenav-item ${active === item.id ? 'is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <button type="button" className="gt-sidenav-user" onClick={() => onNavigate('profile')}>
          <img src="/login/avatar.jpg" alt="" />
          <span>
            <strong>{user?.name}</strong>
            <em>View Profile</em>
          </span>
        </button>
      </aside>

      <div className="gt-workspace">
        <header className="gt-topbar">
          <form
            className="gt-search"
            onSubmit={(event) => {
              event.preventDefault()
              onSearch(search)
            }}
          >
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search itineraries..."
              aria-label="Search itineraries"
            />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
            </button>
          </form>
          <details className="gt-bell">
            <summary aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
                <path d="M10 18a2 2 0 0 0 4 0" />
              </svg>
            </summary>
            <div className="gt-bell-panel">{notice || 'No new notifications.'}</div>
          </details>
          <button type="button" className="gt-topbar-logout" onClick={onLogout}>
            Log out
          </button>
        </header>
        <div className="gt-content">{children}</div>
      </div>
    </div>
  )
}
