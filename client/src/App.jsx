import { useState } from 'react'
import { getSessionUser } from './api/mockClient'
import AppShell from './components/AppShell'
import AuthScreen from './screens/AuthScreen'
import CreateTripScreen from './screens/CreateTripScreen'
import DashboardScreen from './screens/DashboardScreen'
import ItineraryBuilderScreen from './screens/ItineraryBuilderScreen'
import MyTripsScreen from './screens/MyTripsScreen'
import ProfileScreen from './screens/ProfileScreen'
import './voyage.css'

function App() {
  const [user, setUser] = useState(() => getSessionUser())
  const [trip, setTrip] = useState(null)
  const [screen, setScreen] = useState('dashboard')

  function handleNavigate(next) {
    if (next === 'itinerary' && !trip) {
      setScreen('create')
      return
    }
    setScreen(next)
  }

  if (!user) {
    return <AuthScreen onAuthenticated={setUser} />
  }

  return (
    <AppShell user={user} active={screen} onNavigate={handleNavigate}>
      {screen === 'dashboard' && (
        <DashboardScreen user={user} trip={trip} onNavigate={handleNavigate} />
      )}
      {screen === 'trips' && (
        <MyTripsScreen
          onOpenTrip={(nextTrip) => {
            setTrip(nextTrip)
            setScreen('itinerary')
          }}
          onCreateTrip={() => setScreen('create')}
        />
      )}
      {screen === 'create' && (
        <CreateTripScreen
          onCreated={(nextTrip) => {
            setTrip(nextTrip)
            setScreen('itinerary')
          }}
        />
      )}
      {screen === 'itinerary' && trip && <ItineraryBuilderScreen trip={trip} />}
      {screen === 'profile' && <ProfileScreen user={user} />}
    </AppShell>
  )
}

export default App
