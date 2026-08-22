export default function DashboardScreen({ user, trip, onNavigate }) {
  return (
    <>
      <h1 className="vf-page-title">Dashboard</h1>
      <p className="vf-page-sub">Welcome back, {user?.name}. Pick up a trip or start a new one.</p>
      <div className="vf-stack">
        <section className="vf-card">
          <h2 className="vf-panel-title">Current trip</h2>
          {trip ? (
            <>
              <p className="vf-page-sub" style={{ marginBottom: 16 }}>
                {trip.name} · {trip.startDate} → {trip.endDate}
              </p>
              <button className="vf-btn vf-btn-primary" type="button" onClick={() => onNavigate('itinerary')}>
                Open itinerary
              </button>
            </>
          ) : (
            <>
              <p className="vf-empty" style={{ marginBottom: 16 }}>
                You don’t have an active trip yet.
              </p>
              <button className="vf-btn vf-btn-primary" type="button" onClick={() => onNavigate('create')}>
                Create a trip
              </button>
            </>
          )}
        </section>
        <section className="vf-card">
          <h2 className="vf-panel-title">Shortcuts</h2>
          <div className="vf-chip-row">
            <button className="vf-btn vf-btn-ghost" type="button" onClick={() => onNavigate('trips')}>
              My Trips
            </button>
            <button className="vf-btn vf-btn-ghost" type="button" onClick={() => onNavigate('profile')}>
              Profile
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
