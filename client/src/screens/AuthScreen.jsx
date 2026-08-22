import { useState } from 'react'
import { login, signup } from '../api/mockClient'
import './AuthScreen.css'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function EyeIcon({ off }) {
  return off ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
      <path d="M9.9 5.1A10.8 10.8 0 0 1 12 5c5 0 9.3 3.1 11 7.5a11.7 11.7 0 0 1-4.2 4.8" />
      <path d="M6.1 6.1A11.7 11.7 0 0 0 1 12.5C2.7 16.9 7 20 12 20c1.6 0 3.1-.3 4.5-.9" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LoginArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  )
}

function GlobeMark() {
  return (
    <span className="gt-logo-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#fff" />
        <circle cx="16" cy="16" r="8" stroke="#14b8a6" strokeWidth="2" />
        <ellipse cx="16" cy="16" rx="3.5" ry="8" stroke="#14b8a6" strokeWidth="1.6" />
        <path d="M8 16h16M9.5 12.2h13M9.5 19.8h13" stroke="#14b8a6" strokeWidth="1.4" />
      </svg>
    </span>
  )
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.04h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.43z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.34l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.41 13.99A6.01 6.01 0 0 1 6.1 12c0-.69.12-1.36.31-1.99V7.43H3.07A10 10 0 0 0 2 12c0 1.62.39 3.14 1.07 4.57l3.34-2.58z" />
      <path fill="#EA4335" d="M12 5.88c1.47 0 2.78.5 3.82 1.5l2.86-2.86C16.95 2.9 14.7 2 12 2A10 10 0 0 0 3.07 7.43l3.34 2.58C7.2 7.64 9.4 5.88 12 5.88z" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#111"
        d="M16.37 12.63c-.02-2.12 1.73-3.14 1.81-3.19-1-1.45-2.54-1.65-3.08-1.67-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.45 1.08 8.56.71 1.03 1.56 2.19 2.67 2.15 1.07-.04 1.48-.7 2.77-.7 1.29 0 1.66.7 2.8.68 1.16-.02 1.89-1.05 2.59-2.09.82-1.19 1.16-2.34 1.18-2.4-.03-.01-2.25-.86-2.28-3.51zM14.6 6.4c.59-.71.98-1.7.88-2.68-.85.03-1.88.57-2.49 1.28-.55.63-1.03 1.65-.9 2.62.96.07 1.93-.49 2.51-1.22z"
      />
    </svg>
  )
}

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      const result =
        mode === 'login' ? await login(email, password) : await signup(email, password, name)
      onAuthenticated(result.user)
    } catch (err) {
      setError(err.error || 'Something went wrong')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="gt-login">
      <section className="gt-hero" aria-label="GlobeTrotter">
        <div className="gt-hero-brand">
          <GlobeMark />
          <span>GlobeTrotter</span>
        </div>
        <div className="gt-hero-copy">
          <h1>Your journey begins here.</h1>
          <p>
            Manage complex itineraries, discover local gems, and keep all your travel logistics
            beautifully organized in one place.
          </p>
        </div>
      </section>

      <section className="gt-panel">
        <div className="gt-panel-inner">
          <header className="gt-welcome">
            <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p>
              {mode === 'login'
                ? 'Enter your details to access your trips.'
                : 'Enter your details to start planning.'}
            </p>
          </header>

          <form className="gt-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className="gt-field">
                <span>Name</span>
                <div className="gt-input">
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Alex Rivera"
                    required
                  />
                </div>
              </label>
            )}

            <label className="gt-field">
              <span>Email address</span>
              <div className="gt-input">
                <MailIcon />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </label>

            <label className="gt-field">
              <span className="gt-field-row">
                Password
                {mode === 'login' && (
                  <button type="button" className="gt-link">
                    Forgot Password?
                  </button>
                )}
              </span>
              <div className="gt-input">
                <LockIcon />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
                <button
                  type="button"
                  className="gt-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </label>

            {error && <p className="gt-error">{error}</p>}

            <button className="gt-submit" type="submit" disabled={pending}>
              {pending ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Sign Up'}
              <LoginArrowIcon />
            </button>
          </form>

          <div className="gt-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="gt-social">
            <button type="button" className="gt-social-btn">
              <GoogleLogo />
              Google
            </button>
            <button type="button" className="gt-social-btn">
              <AppleLogo />
              Apple
            </button>
          </div>

          <p className="gt-switch">
            {mode === 'login' ? (
              <>
                New to GlobeTrotter?{' '}
                <button
                  type="button"
                  className="gt-link"
                  onClick={() => {
                    setMode('signup')
                    setError('')
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="gt-link"
                  onClick={() => {
                    setMode('login')
                    setError('')
                  }}
                >
                  Log In
                </button>
              </>
            )}
          </p>

          <div className="gt-journeys">
            <div className="gt-journeys-head">
              <h3>Traveler Journeys</h3>
              <span className="gt-inspiration">INSPIRATION</span>
            </div>
            <article className="gt-journey-card">
              <img src="/login/alps.jpg" alt="Exploring the Alps" />
              <div className="gt-journey-overlay">
                <p className="gt-journey-title">Exploring the Alps</p>
                <div className="gt-quote">
                  <img src="/login/avatar.jpg" alt="" />
                  <p>“The views were absolutely breathtaking from the summit.”</p>
                </div>
              </div>
            </article>
          </div>

          <aside className="gt-tip">
            <span className="gt-tip-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
              </svg>
            </span>
            <div>
              <strong>Did you know?</strong>
              <p>
                Venice is made up of 118 small islands, connected by over 400 bridges and 170
                canals.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
