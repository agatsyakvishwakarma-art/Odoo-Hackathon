import { useEffect, useState } from 'react'
import { listTrips } from '../api/mockClient'

export default function MyTripsScreen({ onOpenTrip, onCreateTrip }) {
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

  return (
    <>
      <h1 className="vf-page-title">My Trips</h1>
      <p className="vf-page-sub">Trips you own or can edit.</p>
      {error && <p className="vf-error" style={{ marginBottom: 16 }}>{error}</p>}
      {loading && <p className="vf-empty">Loading trips…</p>}
      {!loading && trips.length === 0 && (
        <section className="vf-card">
          <p className="vf-empty" style={{ marginBottom: 16 }}>
            No trips yet. Create one to start building an itinerary.
          </p>
          <button className="vf-btn vf-btn-primary" type="button" onClick={onCreateTrip}>
            New trip
          </button>
        </section>
      )}
      <div className="vf-trip-grid">
        {trips.map((trip) => (
          <button
            key={trip.id}
            type="button"
            className="vf-trip-card"
            onClick={() => onOpenTrip(trip)}
          >
            <h2>{trip.name}</h2>
            <p>
              {trip.startDate} → {trip.endDate}
            </p>
            {trip.role && <span className="vf-chip">{trip.role}</span>}
          </button>
        ))}
      </div>
    </>
  )
}
