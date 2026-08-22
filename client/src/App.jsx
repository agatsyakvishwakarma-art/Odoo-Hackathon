import { useEffect, useState } from 'react'
import {
  clearSession,
  getMe,
  getSessionUser,
} from './api/mockClient'
import AppShell from './components/AppShell'
import AuthScreen from './screens/AuthScreen'
import BudgetScreen from './screens/BudgetScreen'
import CreateTripScreen from './screens/CreateTripScreen'
import DashboardScreen from './screens/DashboardScreen'
import DestinationsScreen from './screens/DestinationsScreen'
import ItineraryBuilderScreen from './screens/ItineraryBuilderScreen'
import MyTripsScreen from './screens/MyTripsScreen'
import ProfileScreen from './screens/ProfileScreen'
import './voyage.css'
import './shell.css'

function navActive(screen) {
  if (screen === 'create' || screen === 'itinerary' || screen === 'destinations') return 'plan'
  if (screen === 'profile') return 'profile'
  return screen
}

function App() {
  const [user, setUser] = useState(() => getSessionUser())
  const [booting, setBooting] = useState(Boolean(getSessionUser()))
  const [trip, setTrip] = useState(null)
  const [screen, setScreen] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [draft, setDraft] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!getSessionUser()) return
    getMe()
      .then((me) => setUser(me))
      .catch(() => {
        clearSession()
        setUser(null)
      })
      .finally(() => setBooting(false))
  }, [])

  function handleNavigate(next) {
    if (next === 'plan') {
      setScreen(trip ? 'itinerary' : 'create')
      return
    }
    if (next === 'itinerary' && !trip) {
      setScreen('create')
      return
    }
    setScreen(next)
  }

  function handleLogout() {
    clearSession()
    setUser(null)
    setTrip(null)
    setScreen('dashboard')
  }

  if (booting) {
    return <div className="gt-boot">Connecting to GlobeTrotter API…</div>
  }

  if (!user) {
    return <AuthScreen onAuthenticated={setUser} />
  }

  return (
    <AppShell
      user={user}
      active={navActive(screen)}
      search={search}
      notice={notice}
      onSearchChange={setSearch}
      onSearch={(query) => {
        setSearchQuery(query)
        setScreen('trips')
      }}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {screen === 'dashboard' && (
        <DashboardScreen
          user={user}
          onNavigate={handleNavigate}
          onOpenTrip={(nextTrip) => {
            setTrip(nextTrip)
            setScreen('itinerary')
          }}
          onNotice={setNotice}
        />
      )}
      {screen === 'trips' && (
        <MyTripsScreen
          searchQuery={searchQuery}
          onOpenTrip={(nextTrip) => {
            setTrip(nextTrip)
            setScreen('itinerary')
          }}
          onCreateTrip={() => setScreen('create')}
        />
      )}
      {screen === 'destinations' && (
        <DestinationsScreen
          onPickCity={(picked) => {
            setDraft(picked)
            setScreen('create')
          }}
        />
      )}
      {screen === 'create' && (
        <CreateTripScreen
          key={draft?.name || 'new-trip'}
          initial={draft}
          onCreated={(nextTrip) => {
            setDraft(null)
            setTrip(nextTrip)
            setScreen('itinerary')
          }}
        />
      )}
      {screen === 'itinerary' && trip && <ItineraryBuilderScreen trip={trip} />}
      {screen === 'budget' && <BudgetScreen onNavigate={handleNavigate} />}
      {screen === 'profile' && <ProfileScreen user={user} />}
    </AppShell>
  )
}

export default App
