import { useEffect, useState } from 'react'
import { listTrips } from '../api/mockClient'

export default function MyTripsScreen({ onOpenTrip, onCreateTrip, searchQuery = '' }) {
  const [trips, setTrips] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await listTrips()
        if (!cancelled) setTrips(data.trips)
      } catch (err) {
        if (!cancelled) setError(err.error || 'Failed to load trips')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const visible = trips.filter((trip) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.trim().toLowerCase()
    return (
      trip.name.toLowerCase().includes(q) ||
      (trip.description || '').toLowerCase().includes(q)
    )
  })

  return (
    <>
      <div className="gt-section-head" style={{ marginBottom: '8px' }}>
        <h1 className="gt-page-title">Upcoming Trips</h1>
      </div>
      <p className="gt-page-sub">Your next adventures await.</p>

      {error && <p className="vf-error" style={{ marginBottom: 16 }}>{error}</p>}
      {loading && <p className="vf-empty">Loading trips…</p>}
      
      {!loading && visible.length === 0 && (
        <section className="vf-card">
          <p className="vf-empty" style={{ marginBottom: 16 }}>
            {trips.length === 0
              ? 'No trips yet. Create one to start building an itinerary.'
              : 'No trips matched that search.'}
          </p>
          <button className="gt-btn-primary" type="button" onClick={onCreateTrip} style={{ width: 'fit-content' }}>
            New trip
          </button>
        </section>
      )}

      {!loading && visible.length > 0 && (
        <div className="gt-upcoming-grid">
          <article className="gt-featured-card" role="button" tabIndex={0} onClick={() => onOpenTrip(visible[0])}>
            <div className="gt-featured-img-wrap">
              <img src="/login/alps.jpg" alt={visible[0].name} className="gt-featured-img" />
              <span className="gt-featured-badge">In 14 days</span>
            </div>
            <div className="gt-featured-body">
              <h2 className="gt-featured-title">{visible[0].name}</h2>
              <p className="gt-featured-dates">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {visible[0].startDate} - {visible[0].endDate}
              </p>
            </div>
            <div className="gt-featured-footer">
              <div className="gt-featured-avatars">
                <img src="/login/avatar.jpg" alt="User 1" />
              </div>
              <button className="gt-itinerary-btn">View Itinerary</button>
            </div>
            <div className="gt-progress-wrap">
              <div className="gt-progress-bar">
                <div className="gt-progress-fill" style={{ width: '25%' }}></div>
              </div>
              <div className="gt-progress-label">25% Planned</div>
            </div>
          </article>

          {visible[1] && (
            <button className="gt-secondary-card" type="button" onClick={() => onOpenTrip(visible[1])}>
              <div className="gt-secondary-img-wrap">
                <img src="/dashboard/tokyo.jpg" alt={visible[1].name} className="gt-secondary-img" />
                <div className="gt-secondary-overlay"></div>
                <div className="gt-secondary-title-wrap">
                  <h3 className="gt-secondary-title">{visible[1].name}</h3>
                  <p className="gt-secondary-dates-overlay">{visible[1].startDate} - {visible[1].endDate}</p>
                </div>
              </div>
              <div className="gt-secondary-body">
                <p className="gt-secondary-desc">{visible[1].description || 'Get ready for an amazing journey...'}</p>
              </div>
              <div className="gt-secondary-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          )}
        </div>
      )}

      {!loading && visible.length > 2 && (
        <>
          <div className="gt-section-head">
            <h2>Past Trips</h2>
            <button className="gt-view-all">View All</button>
          </div>

          <div className="gt-past-grid">
            {visible.slice(2).map((trip, i) => {
              const images = ['/dashboard/bali.jpg', '/dashboard/paris.jpg', '/dashboard/marrakech.jpg'];
              const imgSrc = images[i % images.length];
              return (
                <button key={trip.id} className="gt-past-card" type="button" onClick={() => onOpenTrip(trip)}>
                  <img src={imgSrc} alt={trip.name} className="gt-past-img" />
                  <div className="gt-past-info">
                    <div className="gt-past-name">{trip.name}</div>
                    <div className="gt-past-date">{trip.startDate}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
