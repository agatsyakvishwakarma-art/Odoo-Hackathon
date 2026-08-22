import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pingResult, setPingResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setPingResult(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <main className="app">
      <h1>GlobeTrotter</h1>
      <p>Frontend ↔ backend connection check</p>

      {loading && <p>Calling GET /api/ping…</p>}
      {error && <p className="error">Error: {error}</p>}
      {pingResult && (
        <pre className="ping-result">{JSON.stringify(pingResult, null, 2)}</pre>
      )}
    </main>
  )
}

export default App
