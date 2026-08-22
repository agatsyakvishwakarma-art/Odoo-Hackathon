import { useEffect, useState } from 'react'
import { listActivities, listStops, listTrips } from '../api/mockClient'

export default function BudgetScreen({ onNavigate }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { trips } = await listTrips()
        const collected = []
        for (const trip of trips) {
          const { stops } = await listStops(trip.id)
          for (const stop of stops) {
            const { activities } = await listActivities(trip.id, stop.id)
            for (const activity of activities) {
              collected.push({
                ...activity,
                tripName: trip.name,
                city: stop.city,
              })
            }
          }
        }
        if (!cancelled) setRows(collected)
      } catch (err) {
        if (!cancelled) setError(err.error || 'Could not load budget from the API')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const total = rows.reduce((sum, row) => sum + Number(row.cost || 0), 0)

  return (
    <>
      <h1 className="vf-page-title">Budget</h1>
      <p className="vf-page-sub">Costs come from activities on your trips (`cost` on each activity).</p>
      {error && <p className="vf-error">{error}</p>}
      {loading && <p className="vf-empty">Loading costs…</p>}
      {!loading && rows.length === 0 && (
        <section className="vf-card">
          <p className="vf-empty" style={{ marginBottom: 16 }}>
            No activity costs yet. Add activities on an itinerary to see them here.
          </p>
          <button className="vf-btn vf-btn-primary" type="button" onClick={() => onNavigate('plan')}>
            Plan a trip
          </button>
        </section>
      )}
      {rows.length > 0 && (
        <section className="vf-card">
          <p className="gt-budget-total">Total {total.toFixed(2)}</p>
          <ul className="gt-budget-list">
            {rows.map((row) => (
              <li key={`${row.stopId}-${row.id}`}>
                <span>
                  <strong>{row.name}</strong>
                  <em>
                    {row.tripName} · {row.city} · {row.category}
                  </em>
                </span>
                <b>{Number(row.cost).toFixed(2)}</b>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
