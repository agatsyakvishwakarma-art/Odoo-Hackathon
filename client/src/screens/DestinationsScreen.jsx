const DESTINATIONS = [
  {
    city: 'Kyoto',
    country: 'Japan',
    blurb: 'Temples, bamboo groves, and tea ceremonies.',
    image: '/dashboard/kyoto.jpg',
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    blurb: 'Trams, miradouros, and Atlantic light.',
    image: '/dashboard/lisbon.jpg',
  },
  {
    city: 'Reykjavik',
    country: 'Iceland',
    blurb: 'Hot springs, basalt coasts, and long golden hours.',
    image: '/dashboard/reykjavik.jpg',
  },
  {
    city: 'Marrakech',
    country: 'Morocco',
    blurb: 'Souks, riads, and the Atlas on the horizon.',
    image: '/dashboard/marrakech.jpg',
  },
]

export default function DestinationsScreen({ onPickCity }) {
  return (
    <>
      <h1 className="vf-page-title">Browse destinations</h1>
      <p className="vf-page-sub">Pick a city to start a trip. Dates and stops are saved through the API.</p>
      <div className="vf-trip-grid">
        {DESTINATIONS.map((place) => (
          <button
            key={place.city}
            type="button"
            className="gt-dest-card"
            onClick={() =>
              onPickCity({
                name: `${place.city} trip`,
                description: place.blurb,
              })
            }
          >
            <img src={place.image} alt="" />
            <div>
              <h2>
                {place.city}
                <span>{place.country}</span>
              </h2>
              <p>{place.blurb}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
