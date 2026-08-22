import React from 'react';

export default function LandingScreen({ onLogin, onSignup }) {
  return (
    <div className="wl-landing-page">
      {/* Navbar */}
      <nav className="wl-navbar">
        <div className="wl-nav-left">
          <div className="wl-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', marginRight: '8px' }}>
              <svg viewBox="0 0 100 100" width="32" height="32">
                <circle cx="50" cy="50" r="48" fill="#fff" stroke="#003366" strokeWidth="2" />
                <path d="M 10 70 L 30 50 L 50 65 L 70 40 L 90 70 Z" fill="#003366" />
                <path d="M 75 70 L 75 55 L 70 65 L 75 60 L 75 50 L 80 60 L 75 65 Z" fill="#003366" stroke="#003366" strokeWidth="2" />
                <circle cx="65" cy="35" r="20" fill="#003366" />
                <circle cx="30" cy="40" r="10" fill="#d4af37" />
                <text x="15" y="80" fontSize="45" fill="#003366" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">Yk</text>
              </svg>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
              <span style={{ fontWeight: '800', fontSize: '20px', color: '#003366', letterSpacing: '3px', lineHeight: '1' }}>Y<span style={{ color: '#d4af37' }}>A</span>TRIK</span>
              <span style={{ fontSize: '7px', letterSpacing: '2px', color: '#003366', textTransform: 'uppercase', marginTop: '2px' }}>— Journey Beyond Limits —</span>
            </div>
          </div>
          <div className="wl-nav-links">
            <a href="#">Home</a>
            <a href="#">Travel guides</a>
            <a href="#">Hotels</a>
          </div>
        </div>
        <div className="wl-nav-right">
          <button className="wl-btn-flat" onClick={onLogin}>Log in</button>
          <button className="wl-btn-primary" onClick={onSignup}>Sign up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="wl-hero">
        <div className="wl-hero-content">
          <h1 className="wl-hero-title">One app for all your travel planning needs</h1>
          <p className="wl-hero-subtitle">Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.</p>
          <div className="wl-hero-actions">
            <button className="wl-btn-primary wl-btn-large" onClick={onSignup}>Start planning</button>
            <button className="wl-btn-outline wl-btn-large">
              Get the app
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ marginLeft: '8px' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="wl-hero-video-wrap">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Travel Planning Demo" 
            className="wl-hero-video-placeholder" 
          />
          <div className="wl-hero-video-caption">
            <h3>Your itinerary and your map in one view</h3>
            <p>No more switching between different apps, tabs, and tools to keep track of your travel plans.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="wl-reviews-section">
        <div className="wl-reviews-header">
          <h2>What travelers are raving about</h2>
          <p>Over 1 million people have already tried Yatrik and loved its easy trip planning features.</p>
        </div>

        <div className="wl-reviews-masonry">
          {[
            {
              name: "Nadia",
              desc: "Travel Blogger @Couple Travel The World",
              text: "Planning your trip by having all the attractions already plugged into a map makes trip planning so much easier."
            },
            {
              name: "Belinda and Kathy Kohles",
              text: "I have used several trip planning apps. This one by far is the best. The interaction between goggle maps makes the planning so much easier. Adding an adventure not in the app is also easy. Love the connection to Trip Advisor also. Everything is connected including booking a stay. Easy to use on phone, tablets and computer! Well thought through development."
            },
            {
              name: "Josh M.",
              text: "I'm a rather extensive planner when I take trips so this was great. I liked how it auto-filled all of my travel information from my email account."
            },
            {
              name: "D Littlejohn",
              text: "The absolute best travel app I've ever tried. Complete and comprehensive planning made our 15 day trip to UK so easy. Tracks and catalogs attractions and sights, hotels, flights, restaurants and so much more complete with maps, trip costs and extras. Will definitely use this again! thanks for a great travel app! loved it!!"
            },
            {
              name: "Jack Corby",
              text: "I have been using this to help me plan a trip to NZ, Fiji and SE Asia. I love that you can search for a location and there are recommended things to do there. This is much easier than generally searching the internet as you can then quickly add it to a list for the future!"
            },
            {
              name: "Beatriz Sauma Fuguet",
              text: "Super useful app to plan a trip and create a bucket list of places to visit"
            }
          ].map((review, i) => (
            <div className="wl-review-card" key={i}>
              <div className="wl-review-author">
                <div className="wl-avatar">
                  {review.name.charAt(0)}
                </div>
                <div className="wl-author-info">
                  <strong>{review.name}</strong>
                  {review.desc && <span>{review.desc}</span>}
                </div>
              </div>
              <div className="wl-stars">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} viewBox="0 0 24 24" fill="#ffb400" width="14" height="14">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
