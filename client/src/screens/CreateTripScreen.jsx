import { useState } from 'react'
import { createTrip } from '../api/mockClient'

export default function CreateTripScreen({ onCreated, initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState(initial?.description || '')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
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
      <h1 className="vf-page-title">Create a trip</h1>
      <p className="vf-page-sub">Set the dates and destination frame. You can add cities next.</p>
      <div className="vf-card">
        <form className="vf-form" onSubmit={handleSubmit}>
          <label className="vf-field">
            <span>Name</span>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer in Japan"
              required
            />
          </label>
          <div className="vf-grid-2">
            <label className="vf-field">
              <span>Start date</span>
              <input
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label className="vf-field">
              <span>End date</span>
              <input
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>
          <label className="vf-field">
            <span>Description</span>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes for this trip"
            />
          </label>
          {error && <p className="vf-error">{error}</p>}
          <button className="vf-btn vf-btn-primary" type="submit" disabled={pending}>
            {pending ? 'Creating…' : 'Create trip'}
          </button>
        </form>
      </div>
    </>
  )
}
