/**
 * API client. Flip USE_MOCK to false to hit the real backend (same function names and payloads).
 *
 * Auth, trip, and stop shapes match the existing Express routes.
 * Activity shapes match server/migrations/001_schema.sql using the same camelCase
 * convention as trips/stops. There are no activity HTTP routes in the backend yet.
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const LATENCY_MS = 350

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const TOKEN_KEY = 'globetrotter_token'
const USER_KEY = 'globetrotter_user'

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

function persistSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getSessionUser() {
  return getStoredUser()
}

// --- in-memory mock store ---
let nextUserId = 2
let nextTripId = 1
let nextStopId = 1
let nextActivityId = 1

const mockUsers = [
  {
    id: 1,
    email: 'demo@globetrotter.app',
    name: 'Demo Traveler',
    password: 'password',
  },
]

const mockTrips = []
const mockMembers = []
const mockStops = []
const mockActivities = []

function formatUser(user) {
  return { id: user.id, email: user.email, name: user.name }
}

function formatTrip(trip, role) {
  const out = {
    id: trip.id,
    name: trip.name,
    startDate: trip.startDate,
    endDate: trip.endDate,
    description: trip.description,
    createdBy: trip.createdBy,
  }
  if (role !== undefined) out.role = role
  return out
}

function formatStop(stop) {
  return {
    id: stop.id,
    city: stop.city,
    arrivalDate: stop.arrivalDate,
    departureDate: stop.departureDate,
    sequence: stop.sequence,
  }
}

function formatActivity(activity) {
  return {
    id: activity.id,
    stopId: activity.stopId,
    name: activity.name,
    category: activity.category,
    cost: activity.cost,
    durationMinutes: activity.durationMinutes,
    notes: activity.notes,
  }
}

function currentMockUser() {
  const token = getStoredToken()
  if (!token || !token.startsWith('mock-token-')) return null
  const id = Number(token.slice('mock-token-'.length))
  return mockUsers.find((u) => u.id === id) || null
}

function requireMockAuth() {
  const user = currentMockUser()
  if (!user) {
    const err = { error: 'Authentication required', status: 401 }
    throw err
  }
  return user
}

function requireTripMember(user, tripId) {
  const membership = mockMembers.find((m) => m.tripId === tripId && m.userId === user.id)
  if (!membership) {
    throw { error: 'Trip not found', status: 404 }
  }
  return membership
}

const ACTIVITY_CATEGORIES = ['transport', 'stay', 'activities', 'meals']

async function mockCall(fn) {
  await wait(LATENCY_MS)
  try {
    return clone(fn())
  } catch (err) {
    if (err && err.error) throw err
    throw { error: 'Request failed', status: 500 }
  }
}

async function liveRequest(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getStoredToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw { error: data.error || 'Request failed', status: res.status }
  }
  return data
}

function call(mockFn, liveFn) {
  return USE_MOCK ? mockFn() : liveFn()
}

export async function signup(email, password, name) {
  return call(
    () =>
      mockCall(() => {
        if (!email || !password || !name) {
          throw { error: 'email, password, and name are required', status: 400 }
        }
        if (mockUsers.some((u) => u.email === email)) {
          throw { error: 'Email already registered', status: 409 }
        }
        const user = { id: nextUserId++, email, password, name }
        mockUsers.push(user)
        const formatted = formatUser(user)
        const token = `mock-token-${user.id}`
        persistSession(token, formatted)
        return { token, user: formatted }
      }),
    async () => {
      const data = await liveRequest('/auth/signup', {
        method: 'POST',
        body: { email, password, name },
      })
      persistSession(data.token, data.user)
      return data
    },
  )
}

export async function login(email, password) {
  return call(
    () =>
      mockCall(() => {
        if (!email || !password) {
          throw { error: 'email and password are required', status: 400 }
        }
        const row = mockUsers.find((u) => u.email === email && u.password === password)
        if (!row) {
          throw { error: 'Invalid email or password', status: 401 }
        }
        const user = formatUser(row)
        const token = `mock-token-${row.id}`
        persistSession(token, user)
        return { token, user }
      }),
    async () => {
      const data = await liveRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      persistSession(data.token, data.user)
      return data
    },
  )
}

export async function getMe() {
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        return formatUser(user)
      }),
    () => liveRequest('/auth/me'),
  )
}

export async function createTrip(data) {
  const { name, startDate, endDate, description } = data
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        if (!name || !startDate || !endDate) {
          throw { error: 'name, startDate, and endDate are required', status: 400 }
        }
        if (endDate < startDate) {
          throw { error: 'endDate must be on or after startDate', status: 400 }
        }
        const trip = {
          id: nextTripId++,
          name,
          startDate,
          endDate,
          description: description ?? null,
          createdBy: user.id,
        }
        mockTrips.push(trip)
        mockMembers.push({ tripId: trip.id, userId: user.id, role: 'owner' })
        return { trip: formatTrip(trip) }
      }),
    () =>
      liveRequest('/trips', {
        method: 'POST',
        body: { name, startDate, endDate, description },
      }),
  )
}

export async function listTrips() {
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        const trips = mockMembers
          .filter((m) => m.userId === user.id)
          .map((m) => {
            const trip = mockTrips.find((t) => t.id === m.tripId)
            return formatTrip(trip, m.role)
          })
          .reverse()
        return { trips }
      }),
    () => liveRequest('/trips'),
  )
}

export async function getTrip(tripId) {
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        const membership = requireTripMember(user, Number(tripId))
        const trip = mockTrips.find((t) => t.id === Number(tripId))
        if (!trip) throw { error: 'Trip not found', status: 404 }
        return { trip: formatTrip(trip, membership.role) }
      }),
    () => liveRequest(`/trips/${tripId}`),
  )
}

export async function listStops(tripId) {
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        requireTripMember(user, Number(tripId))
        const stops = mockStops
          .filter((s) => s.tripId === Number(tripId))
          .sort((a, b) => a.sequence - b.sequence)
          .map(formatStop)
        return { stops }
      }),
    () => liveRequest(`/trips/${tripId}/stops`),
  )
}

export async function addStop(tripId, data) {
  const { city, arrivalDate, departureDate, sequence } = data
  return call(
    () =>
      mockCall(() => {
        const user = requireMockAuth()
        requireTripMember(user, Number(tripId))
        if (!city || !arrivalDate || !departureDate || sequence === undefined || sequence === '') {
          throw {
            error: 'city, arrivalDate, departureDate, and sequence are required',
            status: 400,
          }
        }
        if (departureDate < arrivalDate) {
          throw { error: 'departureDate must be on or after arrivalDate', status: 400 }
        }
        const seq = Number(sequence)
        if (mockStops.some((s) => s.tripId === Number(tripId) && s.sequence === seq)) {
          throw {
            error: 'A stop with this sequence already exists for this trip',
            status: 409,
          }
        }
        const stop = {
          id: nextStopId++,
          tripId: Number(tripId),
          city,
          arrivalDate,
          departureDate,
          sequence: seq,
        }
        mockStops.push(stop)
        return { stop: formatStop(stop) }
      }),
    () =>
      liveRequest(`/trips/${tripId}/stops`, {
        method: 'POST',
        body: { city, arrivalDate, departureDate, sequence: Number(sequence) },
      }),
  )
}

export async function listActivities(tripId, stopId) {
  return call(
    () =>
      mockCall(() => {
        requireMockAuth()
        const stop = mockStops.find(
          (s) => s.id === Number(stopId) && s.tripId === Number(tripId),
        )
        if (!stop) throw { error: 'Stop not found', status: 404 }
        const activities = mockActivities
          .filter((a) => a.stopId === Number(stopId))
          .map(formatActivity)
        return { activities }
      }),
    () => liveRequest(`/trips/${tripId}/stops/${stopId}/activities`),
  )
}

export async function addActivity(tripId, stopId, data) {
  const { name, category, cost, durationMinutes, notes } = data
  return call(
    () =>
      mockCall(() => {
        requireMockAuth()
        const stop = mockStops.find(
          (s) => s.id === Number(stopId) && s.tripId === Number(tripId),
        )
        if (!stop) throw { error: 'Stop not found', status: 404 }
        if (!name || !category) {
          throw { error: 'name and category are required', status: 400 }
        }
        if (!ACTIVITY_CATEGORIES.includes(category)) {
          throw {
            error: 'category must be one of: transport, stay, activities, meals',
            status: 400,
          }
        }
        const activity = {
          id: nextActivityId++,
          stopId: Number(stopId),
          name,
          category,
          cost: cost === undefined || cost === '' ? 0 : Number(cost),
          durationMinutes:
            durationMinutes === undefined || durationMinutes === ''
              ? null
              : Number(durationMinutes),
          notes: notes ?? null,
        }
        mockActivities.push(activity)
        return { activity: formatActivity(activity) }
      }),
    () =>
      liveRequest(`/trips/${tripId}/stops/${stopId}/activities`, {
        method: 'POST',
        body: {
          name,
          category,
          cost,
          durationMinutes,
          notes,
        },
      }),
  )
}

export const ACTIVITY_CATEGORY_OPTIONS = ACTIVITY_CATEGORIES
export { USE_MOCK }
