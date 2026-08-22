import { useState } from 'react'
import { listTrips } from '../api/mockClient'

export default function ProfileScreen({ user }) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    try {
      setExporting(true)
      const data = await listTrips()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'globetrotter_export.json'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to export', err)
      alert('Failed to export data.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <div className="gt-passport-header-wrap">
        <div className="gt-passport-watermark">DIGITAL</div>
        <div className="gt-passport-header-text">
          <div className="gt-passport-title-row">
            <h1>Passport</h1>
            <span className="gt-passport-badge">Active</span>
          </div>
          <p>A comprehensive record of your global footprint. Track destinations, carbon offset, and travel milestones.</p>
        </div>
        <div className="gt-passport-actions">
          <button className="gt-btn-ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Profile
          </button>
          <button className="gt-btn-primary" onClick={handleExport} disabled={exporting}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exporting ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>

      <div className="gt-passport-layout">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="gt-passport-card gt-passport-stats">
            <div className="gt-passport-card-title">
              <h2>Global Stats</h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            
            <div className="gt-stats-grid">
              <div className="gt-stat-box">
                <span>Countries</span>
                <strong>24 <span style={{fontSize: '14px', color: '#9ca3af', fontWeight: '500'}}> / 195</span></strong>
              </div>
              <div className="gt-stat-box">
                <span>Flights</span>
                <strong className="c-red">87</strong>
              </div>
              <div className="gt-stat-box">
                <span>Miles</span>
                <strong className="c-orange">142K</strong>
              </div>
              <div className="gt-stat-box">
                <span>CO2 Offset</span>
                <strong>94%</strong>
              </div>
            </div>

            <div className="gt-tier-info">
              <span>World Explorer Tier</span>
              <span>6,400 pts to Elite</span>
            </div>
            <div className="gt-progress-bar">
              <div className="gt-progress-fill" style={{ width: '80%', background: '#0f766e' }}></div>
            </div>
          </div>

          <div className="gt-passport-card">
            <div className="gt-passport-card-title">
              <h2>Milestones</h2>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f766e', cursor: 'pointer' }}>View All</span>
            </div>
            
            <div className="gt-milestones">
              <div className="gt-ms-item">
                <div className="gt-ms-icon bg-teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="gt-ms-content">
                  <div className="gt-ms-date">Oct 2023</div>
                  <div className="gt-ms-title">Crossed the Equator</div>
                  <div className="gt-ms-desc">Flight from NYC to Buenos Aires.</div>
                </div>
              </div>

              <div className="gt-ms-item">
                <div className="gt-ms-icon bg-red">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="gt-ms-content">
                  <div className="gt-ms-date">Aug 2023</div>
                  <div className="gt-ms-title">7th Wonder Visited</div>
                  <div className="gt-ms-desc">Machu Picchu, Peru.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="gt-passport-map">
            <div className="gt-map-controls">
              <button className="gt-map-btn" aria-label="Zoom in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button className="gt-map-btn" aria-label="Zoom out">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button className="gt-map-btn" aria-label="Center map">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            <div className="gt-next-dest">
              <span>NEXT DESTINATION</span>
              <strong>Reykjavík</strong>
              <p>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                In 14 days
              </p>
            </div>
          </div>

          <div className="gt-passport-bottom-row">
            <div className="gt-passport-card" style={{ padding: '20px' }}>
              <div className="gt-status-info">
                <h4>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Climate Preference
                </h4>
                <strong style={{ fontSize: '20px' }}>Tropical</strong>
              </div>
            </div>

            <div className="gt-passport-card gt-status-card" style={{ padding: '20px' }}>
              <div className="gt-status-info">
                <h4>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Passport Status
                </h4>
                <strong style={{ fontSize: '20px' }}>Valid <em>Exp: 2028</em></strong>
              </div>
              
              <div className="gt-ring-chart">
                <svg viewBox="0 0 100 100" className="gt-ring-svg">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0f766e" strokeWidth="12" strokeDasharray="188 251" />
                </svg>
                <div className="gt-ring-center">75%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
