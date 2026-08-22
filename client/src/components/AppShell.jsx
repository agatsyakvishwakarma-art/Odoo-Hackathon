function YatrikMark() {
  return (
    <span className="gob-mark" aria-hidden="true" style={{ display: 'inline-flex' }}>
      <svg viewBox="0 0 100 100" width="32" height="32">
        <circle cx="50" cy="50" r="48" fill="#fff" stroke="#003366" strokeWidth="2" />
        <path d="M 10 70 L 30 50 L 50 65 L 70 40 L 90 70 Z" fill="#003366" />
        <path d="M 75 70 L 75 55 L 70 65 L 75 60 L 75 50 L 80 60 L 75 65 Z" fill="#003366" stroke="#003366" strokeWidth="2" />
        <circle cx="65" cy="35" r="20" fill="#003366" />
        <circle cx="30" cy="40" r="10" fill="#d4af37" />
        <text x="15" y="80" fontSize="45" fill="#003366" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">Yk</text>
      </svg>
    </span>
  )
}

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'trips', label: 'My Trips' },
  { id: 'explore', label: 'Explore' },
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
    <div className="gob-shell">
      {/* SECTION 1: TOP NAV */}
      <header className="gob-topnav">
        <div className="gob-topnav-left">
          <div className="gob-brand" style={{ display: 'flex', alignItems: 'center' }}>
            <YatrikMark />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
              <span className="gob-brand-text" style={{ fontSize: '20px', letterSpacing: '4px', color: '#003366', fontWeight: 'bold', lineHeight: '1' }}>
                Y<span style={{ color: '#d4af37' }}>A</span>TRIK
              </span>
              <span style={{ fontSize: '7px', letterSpacing: '2px', color: '#003366', textTransform: 'uppercase', marginTop: '2px' }}>
                — Journey Beyond Limits —
              </span>
            </div>
          </div>
          <nav className="gob-nav-links">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`gob-nav-link ${active === item.id || (active === 'plan' && item.id === 'trips') ? 'is-active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="gob-topnav-right">
          <form
            className="gob-search-bar"
            onSubmit={(event) => {
              event.preventDefault()
              onSearch(search)
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search place or user..."
              aria-label="Search"
            />
          </form>

          <details className="gob-bell">
            <summary aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
                <path d="M10 18a2 2 0 0 0 4 0" />
              </svg>
              <div className="gob-bell-badge"></div>
            </summary>
            <div className="gob-bell-panel">{notice || 'No new notifications.'}</div>
          </details>

          <div className="gob-user-menu">
            <img src="/login/avatar.jpg" alt="User Avatar" className="gob-avatar" />
            <div className="gob-user-dropdown">
              <button type="button" onClick={() => onNavigate('profile')}>Profile</button>
              <button type="button" onClick={onLogout}>Log out</button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="gob-main">
        {children}
      </main>

      {/* SECTION 8: FOOTER */}
      <footer className="gob-footer">
        <div className="gob-footer-inner">
          <div className="gob-footer-col">
            <div className="gob-brand" style={{ display: 'flex', alignItems: 'center' }}>
              <YatrikMark />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
                <span className="gob-brand-text" style={{ fontSize: '20px', letterSpacing: '4px', color: '#003366', fontWeight: 'bold', lineHeight: '1' }}>
                  Y<span style={{ color: '#d4af37' }}>A</span>TRIK
                </span>
                <span style={{ fontSize: '7px', letterSpacing: '2px', color: '#003366', textTransform: 'uppercase', marginTop: '2px' }}>
                  — Journey Beyond Limits —
                </span>
              </div>
            </div>
            <p>Plan your perfect trip with friends, discover new places, and track your budget all in one beautiful app.</p>
            <select className="gob-lang-select" aria-label="Language selection">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
          <div className="gob-footer-col">
            <h4>Product</h4>
            <a href="#">Trip Planner</a>
            <a href="#">Explore Destinations</a>
            <a href="#">Budget Tracker</a>
            <a href="#">Mobile App</a>
          </div>
          <div className="gob-footer-col">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Travel Guides</a>
            <a href="#">Community</a>
            <a href="#">Blog</a>
          </div>
          <div className="gob-footer-col">
            <h4>Get the App</h4>
            <img src="/assets/app-store.svg" alt="App Store" className="gob-store-badge" />
            <img src="/assets/google-play.svg" alt="Google Play" className="gob-store-badge" />
          </div>
        </div>
      </footer>

      {/* Floating Chat Bubble */}
      <button className="gob-chat-bubble" aria-label="Help and Support">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  )
}
