import { useState } from 'react'
import { createTrip } from '../api/mockClient'

const STYLES = ['Leisure', 'Adventure', 'Business', 'Family', 'Cultural']

export default function CreateTripScreen({ onCreated, onCancel, initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState(initial?.description || '')
  const [style, setStyle] = useState('Adventure')
  const [pace, setPace] = useState(50)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    if (event) event.preventDefault()
    setError('')
    setPending(true)
    try {
      const { trip } = await createTrip({
        name,
        startDate,
        endDate,
        description: description || null,
      })
      onCreated(trip)
    } catch (err) {
      setError(err.error || 'Failed to create trip')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <div className="gt-create-hero">
        <div className="gt-create-hero-content">
          <div className="gt-create-hero-text">
            <span>CREATE NEW ITINERARY</span>
            <h1>New Adventure</h1>
          </div>
          <div className="gt-draft-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Auto-saving drafts...
          </div>
        </div>
      </div>

      <div className="gt-create-layout">
        {/* Left Column */}
        <div className="gt-create-card">
          <h2 className="gt-create-card-title">Trip Essentials</h2>
          <p className="gt-create-card-sub">Define the core parameters of your upcoming journey.</p>
          
          <form id="create-trip-form" onSubmit={handleSubmit}>
            <div className="gt-create-field">
              <span>Destination or Trip Name</span>
              <div className="gt-create-input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Summer in Kyoto, 2024"
                  required
                />
              </div>
            </div>

            <div className="gt-create-row">
              <div className="gt-create-field">
                <span>Start Date</span>
                <div className="gt-create-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="gt-create-field">
                <span>End Date</span>
                <div className="gt-create-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    name="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="gt-create-field">
              <span>Description & Notes</span>
              <div className="gt-create-input-wrap">
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly outline the purpose of this trip..."
                />
              </div>
            </div>
            
            {error && <p className="vf-error" style={{marginTop: '16px'}}>{error}</p>}
          </form>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="gt-create-card">
            <div className="gt-create-card-title-row">
              <h2 className="gt-create-card-title">Cover Photo</h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="gt-create-dropzone" style={{ marginTop: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
                <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="3" />
              </svg>
              <strong>Click to browse or drag & drop</strong>
              <span>Supported formats: JPG, PNG, WEBP<br/>(Max 5MB)</span>
            </div>
          </div>

          <div className="gt-create-card">
            <h2 className="gt-create-card-title">Travel Style</h2>
            <p className="gt-create-card-sub" style={{ marginBottom: '16px' }}>Help us tailor recommendations.</p>
            
            <div className="gt-chips">
              {STYLES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`gt-chip ${style === s ? 'is-active' : ''}`}
                  onClick={() => setStyle(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="gt-pace-labels">
              <span>Pace</span>
              <span>{pace < 33 ? 'Relaxed' : pace < 66 ? 'Moderate' : 'Packed'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pace}
              onChange={(e) => setPace(Number(e.target.value))}
              className="gt-pace-slider"
            />
            <div className="gt-pace-scale">
              <span>Relaxed</span>
              <span>Packed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gt-create-actions">
        <button type="button" className="gt-btn-ghost" onClick={onCancel}>Cancel</button>
        <button form="create-trip-form" type="submit" className="gt-btn-primary" disabled={pending}>
          {pending ? 'Saving...' : 'Save & Start Planning'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </>
  )
}
