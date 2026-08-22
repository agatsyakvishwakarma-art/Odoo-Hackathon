import { useEffect, useState, useMemo } from 'react'
import { listActivities, listStops, listTrips } from '../api/mockClient'

export default function BudgetScreen({ onNavigate }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

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
              if (activity.cost) {
                collected.push({
                  ...activity,
                  tripName: trip.name,
                  city: stop.city,
                })
              }
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

  const { totalSpent, categories, grouped } = useMemo(() => {
    let total = 0
    const cats = {
      Flights: 0,
      Accommodation: 0,
      'Food & Drink': 0,
      Activities: 0,
      Transport: 0,
    }
    const filteredRows = rows.filter(r => 
      !searchQuery.trim() || r.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

    const groupMap = {}
    
    for (const row of filteredRows) {
      const cost = Number(row.cost || 0)
      total += cost
      
      const c = row.category || 'Activities'
      if (cats[c] !== undefined) cats[c] += cost
      else cats.Activities += cost
      
      const groupKey = row.tripName || 'Other'
      if (!groupMap[groupKey]) groupMap[groupKey] = []
      groupMap[groupKey].push(row)
    }

    const categoriesList = Object.entries(cats)
      .filter(([_, val]) => val > 0)
      .map(([name, val]) => ({
        name,
        val,
        pct: total > 0 ? (val / total) * 100 : 0
      }))
      .sort((a, b) => b.val - a.val)

    return { totalSpent: total, categories: categoriesList, grouped: groupMap }
  }, [rows, searchQuery])

  const CIRCUMFERENCE = 251.3
  let currentOffset = 0
  const donutCircles = categories.map((c) => {
    const strokeDasharray = `${(c.pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`
    const strokeDashoffset = -currentOffset
    currentOffset += (c.pct / 100) * CIRCUMFERENCE
    return { ...c, strokeDasharray, strokeDashoffset }
  })

  const catClassMap = {
    'Flights': 'cat-flights',
    'Accommodation': 'cat-accom',
    'Food & Drink': 'cat-food',
    'Activities': 'cat-activities',
    'Transport': 'cat-transport'
  }
  const pillClassMap = {
    'Flights': 'pill-flights',
    'Accommodation': 'pill-accom',
    'Food & Drink': 'pill-food',
    'Activities': 'pill-activities',
    'Transport': 'pill-transport'
  }
  const iconClassMap = {
    'Flights': 'icon-flights',
    'Accommodation': 'icon-accom',
    'Food & Drink': 'icon-food',
    'Activities': 'icon-activities',
    'Transport': 'icon-transport'
  }

  const getIcon = (cat) => {
    if (cat === 'Flights') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l7 4-3 3-3.5-.5-1.5 1.5 4 2 2 4 1.5-1.5-.5-3.5 3-3 4 7l1.2-.7c.4-.2.7-.6.6-1.1z"/></svg>
    if (cat === 'Accommodation') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>
    if (cat === 'Food & Drink') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    if (cat === 'Transport') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
  }

  const getStrokeColor = (cat) => {
    if (cat === 'Flights') return '#0f766e'
    if (cat === 'Accommodation') return '#9f1239'
    if (cat === 'Food & Drink') return '#fb923c'
    if (cat === 'Transport') return '#fbbf24'
    return '#fbbf24'
  }

  // hardcoded overall budget for progress
  const TOTAL_BUDGET = 5000
  const budgetProgress = Math.min(100, (totalSpent / TOTAL_BUDGET) * 100)

  return (
    <>
      <div className="gt-budget-head-wrap">
        <div className="gt-budget-head-text">
          <div className="gt-budget-kicker">Financial Overview</div>
          <h1>All Trips 2024</h1>
          <p>Track your expenses, manage categories, and stay within your planned budget across all your upcoming trips.</p>
        </div>
        <div className="gt-budget-head-actions">
          <button className="gt-budget-select">
            USD ($)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="gt-budget-add-btn" onClick={() => onNavigate('plan')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Expense
          </button>
        </div>
      </div>

      {error && <p className="vf-error" style={{ marginBottom: 16 }}>{error}</p>}
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

      {!loading && rows.length > 0 && (
        <div className="gt-budget-layout">
          {/* Left Column */}
          <div>
            <div className="gt-budget-card gt-budget-summary">
              <div className="gt-budget-summary-bg"></div>
              <h3>Total Spent</h3>
              <div className="gt-budget-amount">
                <strong>${Math.floor(totalSpent).toLocaleString()}</strong>
                <span>.{(totalSpent % 1).toFixed(2).substring(2)}</span>
              </div>
              
              <div style={{ marginTop: '12px' }}>
                <div className="gt-budget-progress-head">
                  <span>Budget Progress</span>
                  <span>{Math.round(budgetProgress)}%</span>
                </div>
                <div className="gt-budget-progress-bar">
                  <div className="gt-budget-progress-fill" style={{ width: `${budgetProgress}%` }}></div>
                </div>
                <div className="gt-budget-progress-foot">
                  <span>of ${TOTAL_BUDGET.toLocaleString()} budget</span>
                  <span>${Math.max(0, TOTAL_BUDGET - totalSpent).toLocaleString()} left</span>
                </div>
              </div>
            </div>

            <div className="gt-budget-card gt-budget-breakdown-card">
              <h3>Breakdown</h3>
              <div className="gt-donut-wrap">
                <svg viewBox="0 0 100 100" className="gt-donut-svg">
                  {donutCircles.map((c) => (
                    <circle
                      key={c.name}
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={getStrokeColor(c.name)}
                      strokeWidth="12"
                      strokeDasharray={c.strokeDasharray}
                      strokeDashoffset={c.strokeDashoffset}
                    />
                  ))}
                </svg>
                <div className="gt-donut-center">
                  <strong>{categories.length}</strong>
                  <span>CATEGORIES</span>
                </div>
              </div>

              <div className="gt-breakdown-list">
                {categories.map((c) => (
                  <div key={c.name} className={`gt-breakdown-item ${catClassMap[c.name] || 'cat-activities'}`}>
                    <div className="gt-breakdown-dot"></div>
                    <div className="gt-breakdown-label">{c.name}</div>
                    <div className="gt-breakdown-value">
                      <strong>${c.val.toFixed(2)}</strong>
                      <span>{Math.round(c.pct)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="gt-budget-card">
            <div className="gt-tx-head">
              <h2>Transactions</h2>
              <div className="gt-tx-actions">
                <div className="gt-tx-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="gt-tx-filter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="gt-tx-table">
              <div className="gt-tx-table-head">
                <span>DESCRIPTION</span>
                <span>CATEGORY</span>
                <span>LOCATION</span>
                <span>AMOUNT</span>
              </div>

              {Object.entries(grouped).map(([groupName, groupRows]) => (
                <div key={groupName} className="gt-tx-group">
                  <div className="gt-tx-date">{groupName}</div>
                  
                  {groupRows.map((row, idx) => {
                    const cat = row.category || 'Activities'
                    const pClass = pillClassMap[cat] || 'pill-activities'
                    const iClass = iconClassMap[cat] || 'icon-activities'
                    
                    return (
                      <div key={idx} className="gt-tx-row">
                        <div className="gt-tx-desc">
                          <div className={`gt-tx-icon ${iClass}`}>
                            {getIcon(cat)}
                          </div>
                          <div className="gt-tx-info">
                            <strong>{row.name}</strong>
                          </div>
                        </div>
                        <div><span className={`gt-tx-pill ${pClass}`}>{cat}</span></div>
                        <div className="gt-tx-time">{row.city}</div>
                        <div className="gt-tx-amount">${Number(row.cost).toFixed(2)}</div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
