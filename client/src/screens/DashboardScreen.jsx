import { useEffect, useMemo, useState } from 'react'
import { listActivities, listStops, listTrips } from '../api/mockClient'

const CHECKLIST_DEFAULTS = [
  { id: 'shinkansen', label: 'Book Shinkansen tickets', done: true },
  { id: 'omakase', label: 'Reserve Omakase dinner', done: true },
  { id: 'insurance', label: 'Buy travel insurance', done: false },
  { id: 'lodging', label: 'Confirm lodging', done: false },
  { id: 'maps', label: 'Download offline maps', done: false },
]

function firstName(user) {
  return user?.name?.split(' ')[0] || 'there'
}

function daysUntil(dateStr) {
  const start = new Date(`${dateStr}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((start - today) / 86400000)
}

function formatRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  const opts = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`
}

function tripLength(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  return Math.max(1, Math.round((end - start) / 86400000) + 1)
}

function pickUpcoming(trips) {
  const sorted = [...trips].sort((a, b) => a.startDate.localeCompare(b.startDate))
  return sorted.find((t) => daysUntil(t.startDate) >= 0) || sorted[sorted.length - 1] || null
}

function cityImage(city) {
  const key = (city || '').toLowerCase()
  if (key.includes('kyoto') || key.includes('japan') || key.includes('osaka') || key.includes('tokyo')) {
    return '/dashboard/kyoto.jpg'
  }
  if (key.includes('lisbon') || key.includes('portugal')) return '/dashboard/lisbon.jpg'
  if (key.includes('reykjav') || key.includes('iceland')) return '/dashboard/reykjavik.jpg'
  if (key.includes('marrakech') || key.includes('morocco')) return '/dashboard/marrakech.jpg'
  return '/dashboard/kyoto.jpg'
}

function loadChecklist(tripId) {
  try {
    const raw = localStorage.getItem(`gt-checklist-${tripId}`)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return CHECKLIST_DEFAULTS.map((item) => ({ ...item }))
}

async function fetchTemp(city) {
  if (!city) return null
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
  )
  const geo = await geoRes.json()
  const loc = geo.results?.[0]
  if (!loc) return null
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m`,
  )
  const weather = await weatherRes.json()
  const temp = weather.current?.temperature_2m
  return typeof temp === 'number' ? Math.round(temp) : null
}

export default function DashboardScreen({ user, onNavigate, onOpenTrip, onNotice }) {
  const [trip, setTrip] = useState(null)
  const [city, setCity] = useState('')
  const [flight, setFlight] = useState(null)
  const [temp, setTemp] = useState(null)
  const [checklist, setChecklist] = useState(CHECKLIST_DEFAULTS)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { trips } = await listTrips()
        const next = pickUpcoming(trips)
        if (cancelled) return
        if (!next) {
          setTrip(null)
          onNotice?.('No upcoming trips yet.')
          return
        }
        setTrip(next)
        const { stops } = await listStops(next.id)
        if (cancelled) return
        const firstCity = stops[0]?.city || next.name
        setCity(firstCity)
        setChecklist(loadChecklist(next.id))
        const days = daysUntil(next.startDate)
        onNotice?.(
          days >= 0
            ? `Your trip to ${firstCity} is in ${days} day${days === 1 ? '' : 's'}.`
            : `${next.name} already started.`,
        )

        let transport = null
        for (const stop of stops) {
          const { activities } = await listActivities(next.id, stop.id)
          transport = activities.find((a) => a.category === 'transport')
          if (transport) break
        }
        if (!cancelled) setFlight(transport || null)

        try {
          const t = await fetchTemp(firstCity)
          if (!cancelled) setTemp(t)
        } catch {
          if (!cancelled) setTemp(null)
        }
      } catch (err) {
        if (!cancelled) setError(err.error || 'Could not load dashboard from the API')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [onNotice])

  const doneCount = checklist.filter((item) => item.done).length
  const greeting = useMemo(() => firstName(user), [user])
  const days = trip ? daysUntil(trip.startDate) : null

  function toggleCheck(id) {
    setChecklist((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
      if (trip) localStorage.setItem(`gt-checklist-${trip.id}`, JSON.stringify(next))
      return next
    })
  }

  return (
    <>
      <div className="gt-dash-head">
        <div>
          <h1>Welcome back, {greeting}.</h1>
          <p>
            {loading && 'Loading your trips from the server…'}
            {!loading && error && error}
            {!loading && !error && trip && days >= 0 && (
              <>
                Your upcoming trip to {city || trip.name} is in {days} day
                {days === 1 ? '' : 's'}. We&apos;ve gathered some recommendations.
              </>
            )}
            {!loading && !error && trip && days < 0 && <>{trip.name} is underway. Open the itinerary to keep planning.</>}
            {!loading && !error && !trip && 'You have no trips yet. Plan a new trip to see it here.'}
          </p>
        </div>
        <div className="gt-dash-actions">
          <button type="button" className="gt-pill gt-pill-muted" onClick={() => onNavigate('destinations')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <polygon points="12,3 14.5,9 21,12 14.5,15 12,21 9.5,15 3,12 9.5,9" />
            </svg>
            Browse Destinations
          </button>
          <button type="button" className="gt-pill gt-pill-solid" onClick={() => onNavigate('create')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Plan New Trip
          </button>
        </div>
      </div>

      <div className="gt-upnext-head">
        <h2>Up Next</h2>
        <button
          type="button"
          className="gt-text-link"
          onClick={() => (trip ? onOpenTrip(trip) : onNavigate('create'))}
        >
          View full itinerary →
        </button>
      </div>

      <div className="gt-upnext-grid">
        <article
          className="gt-hero-trip"
          role="button"
          tabIndex={0}
          onClick={() => (trip ? onOpenTrip(trip) : onNavigate('create'))}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              if (trip) onOpenTrip(trip)
              else onNavigate('create')
            }
          }}
        >
          <img src={cityImage(city || trip?.name)} alt="" />
          <div className="gt-hero-trip-fade" />
          <div className="gt-weather">
            {temp != null ? `${temp}°` : '—'} {(city || 'TRIP').toUpperCase()}
          </div>
          <div className="gt-hero-trip-copy">
            {trip ? (
              <>
                <div className="gt-hero-badges">
                  <span className="gt-badge-muted">{days >= 0 ? 'Confirmed' : 'In progress'}</span>
                  <span className="gt-badge-teal">
                    ✈ {formatRange(trip.startDate, trip.endDate)}
                  </span>
                </div>
                <h3>{trip.name}</h3>
                <p>
                  {trip.description ||
                    `${tripLength(trip.startDate, trip.endDate)} days across ${city || 'your stops'}.`}
                </p>
              </>
            ) : (
              <>
                <h3>No trip on the board</h3>
                <p>Create a trip to pin it here with dates, cities, and activities from the API.</p>
              </>
            )}
          </div>
        </article>

        <div className="gt-upnext-side">
          <section className="gt-flight">
            <div className="gt-card-kicker">
              <span>DEPARTURE FLIGHT</span>
              <span className="gt-icon-bubble">✈</span>
            </div>
            {flight ? (
              <>
                <div className="gt-flight-path">
                  <div>
                    <strong>OUT</strong>
                    <em>{flight.durationMinutes ? `${flight.durationMinutes} min` : 'Transport'}</em>
                  </div>
                  <div className="gt-flight-line" />
                  <div>
                    <strong>{(city || '—').slice(0, 3).toUpperCase()}</strong>
                    <em>{trip?.startDate}</em>
                  </div>
                </div>
                <div className="gt-flight-meta">
                  {flight.name}
                  {flight.notes ? ` · ${flight.notes}` : ''}
                </div>
              </>
            ) : (
              <div className="gt-empty-card">
                <span>Add a transport activity on your itinerary to show flight details here.</span>
                <button type="button" className="gt-text-link" onClick={() => (trip ? onOpenTrip(trip) : onNavigate('create'))}>
                  Open itinerary
                </button>
              </div>
            )}
          </section>

          <section className="gt-checklist">
            <div className="gt-card-kicker">
              <span>PRE-TRIP CHECKLIST</span>
              <span className="gt-check-count">
                {doneCount} of {checklist.length} done
              </span>
            </div>
            <ul>
              {checklist.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <label className={item.done ? 'is-done' : ''}>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleCheck(item.id)}
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
