import { useEffect, useState } from 'react'
import {
  ACTIVITY_CATEGORY_OPTIONS,
  addActivity,
  addStop,
  listActivities,
  listStops,
} from '../api/mockClient'

export default function ItineraryBuilderScreen({ trip }) {
  const [stops, setStops] = useState([])
  const [activitiesByStop, setActivitiesByStop] = useState({})
  const [error, setError] = useState('')
  const [stopPending, setStopPending] = useState(false)
  const [activityPending, setActivityPending] = useState(false)

  const [city, setCity] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [sequence, setSequence] = useState(1)

  const [stopId, setStopId] = useState('')
  const [activityName, setActivityName] = useState('')
  const [category, setCategory] = useState('activities')
  const [cost, setCost] = useState(0)
  const [durationMinutes, setDurationMinutes] = useState('')
  const [notes, setNotes] = useState('')

  async function refreshStops(preferredStopId) {
    const { stops: nextStops } = await listStops(trip.id)
    setStops(nextStops)
    const byStop = {}
    for (const stop of nextStops) {
      const { activities } = await listActivities(trip.id, stop.id)
      byStop[stop.id] = activities
    }
    setActivitiesByStop(byStop)
    const nextId = preferredStopId || nextStops[0]?.id || ''
    setStopId(nextId ? String(nextId) : '')
    setSequence(nextStops.length + 1)
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await refreshStops()
      } catch (err) {
        if (!cancelled) setError(err.error || 'Failed to load itinerary')
      }
    })()
    return () => {
      cancelled = true
    }
    // trip.id is stable for this screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip.id])

  async function handleAddStop(event) {
    event.preventDefault()
    setError('')
    setStopPending(true)
    try {
      const { stop } = await addStop(trip.id, {
        city,
        arrivalDate,
        departureDate,
        sequence: Number(sequence),
      })
      setCity('')
      setArrivalDate('')
      setDepartureDate('')
      await refreshStops(stop.id)
    } catch (err) {
      setError(err.error || 'Failed to add stop')
    } finally {
      setStopPending(false)
    }
  }

  async function handleAddActivity(event) {
    event.preventDefault()
    setError('')
    if (!stopId) {
      setError('Add a stop before assigning an activity')
      return
    }
    setActivityPending(true)
    try {
      await addActivity(trip.id, Number(stopId), {
        name: activityName,
        category,
        cost: Number(cost),
        durationMinutes: durationMinutes === '' ? null : Number(durationMinutes),
        notes: notes || null,
      })
      setActivityName('')
      setCost(0)
      setDurationMinutes('')
      setNotes('')
      await refreshStops(Number(stopId))
    } catch (err) {
      setError(err.error || 'Failed to add activity')
    } finally {
      setActivityPending(false)
    }
  }

  return (
    <>
        <h1 className="vf-page-title">{trip.name}</h1>
        <p className="vf-page-sub">
          {trip.startDate} → {trip.endDate}
          {trip.description ? ` · ${trip.description}` : ''}
        </p>

        {error && <p className="vf-error" style={{ marginBottom: 16 }}>{error}</p>}

        <div className="vf-split">
          <section className="vf-timeline">
            {stops.length === 0 && (
              <p className="vf-empty">No stops yet. Assign a city on the right to begin the timeline.</p>
            )}
            {stops.map((stop) => (
              <article key={stop.id} className="vf-stop">
                <h3>
                  {stop.sequence}. {stop.city}
                </h3>
                <p>
                  {stop.arrivalDate} → {stop.departureDate}
                </p>
                <div className="vf-chip-row">
                  {(activitiesByStop[stop.id] || []).length === 0 && (
                    <span className="vf-empty">No activities yet</span>
                  )}
                  {(activitiesByStop[stop.id] || []).map((activity) => (
                    <span key={activity.id} className={`vf-chip vf-chip-${activity.category}`}>
                      {activity.name}
                      {activity.durationMinutes ? ` · ${activity.durationMinutes}m` : ''}
                      {activity.cost ? ` · ${activity.cost}` : ''}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <div className="vf-stack">
            <section className="vf-card">
              <h2 className="vf-panel-title">Add stop</h2>
              <form className="vf-form" onSubmit={handleAddStop}>
                <label className="vf-field">
                  <span>City</span>
                  <input
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kyoto"
                    required
                  />
                </label>
                <div className="vf-grid-2">
                  <label className="vf-field">
                    <span>Arrival date</span>
                    <input
                      name="arrivalDate"
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      required
                    />
                  </label>
                  <label className="vf-field">
                    <span>Departure date</span>
                    <input
                      name="departureDate"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <label className="vf-field">
                  <span>Sequence</span>
                  <input
                    name="sequence"
                    type="number"
                    min="1"
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                    required
                  />
                </label>
                <button className="vf-btn vf-btn-primary" type="submit" disabled={stopPending}>
                  {stopPending ? 'Adding…' : 'Add stop'}
                </button>
              </form>
            </section>

            <section className="vf-card">
              <h2 className="vf-panel-title">Add activity</h2>
              <form className="vf-form" onSubmit={handleAddActivity}>
                <label className="vf-field">
                  <span>Assign to city</span>
                  <select
                    name="stopId"
                    value={stopId}
                    onChange={(e) => setStopId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      {stops.length ? 'Select a stop' : 'Add a stop first'}
                    </option>
                    {stops.map((stop) => (
                      <option key={stop.id} value={stop.id}>
                        {stop.city}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="vf-field">
                  <span>Name</span>
                  <input
                    name="name"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="Tea ceremony"
                    required
                  />
                </label>
                <label className="vf-field">
                  <span>Category</span>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {ACTIVITY_CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="vf-grid-2">
                  <label className="vf-field">
                    <span>Cost</span>
                    <input
                      name="cost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </label>
                  <label className="vf-field">
                    <span>Duration (minutes)</span>
                    <input
                      name="durationMinutes"
                      type="number"
                      min="0"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                    />
                  </label>
                </div>
                <label className="vf-field">
                  <span>Notes</span>
                  <textarea
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
                <button className="vf-btn vf-btn-primary" type="submit" disabled={activityPending}>
                  {activityPending ? 'Adding…' : 'Add activity'}
                </button>
              </form>
            </section>
          </div>
        </div>
    </>
  )
}
