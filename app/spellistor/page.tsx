import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Spellistor till barnkalas – musik för varje ålder',
  description: 'Färdiga Spotify-spellistor till barnkalaset, sorterade efter åldersgrupp 4–8 år. Sätt på musiken och låt kalaset börja.',
  alternates: { canonical: '/spellistor' },
}

const PLAYLISTS = [
  {
    age: '4-åringar',
    emoji: '🐣',
    color: '#fce7f3',
    desc: 'Lekfull och glad musik för de allra yngsta festdeltagarna.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P',
  },
  {
    age: '5-åringar',
    emoji: '🌟',
    color: '#fef3c7',
    desc: 'Energisk musik som håller igång dansgolvet under hela kalaset.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P',
  },
  {
    age: '6-åringar',
    emoji: '🎵',
    color: '#d1fae5',
    desc: 'En mix av barnfavoriter och roliga danslåtar.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P',
  },
  {
    age: '7 & 8-åringar',
    emoji: '🎤',
    color: '#dbeafe',
    desc: 'Lite mer poppig och energisk musik för de äldre barnen.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX6XE7HRLM75P',
  },
]

export default function SpellistorPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#faf1ef', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, color: '#4e4e4e', marginBottom: '0.75rem' }}>
              Spellistor
            </h1>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.4rem', color: '#5910b6', lineHeight: '130%' }}>
              Perfekt bakgrundsmusik till kalaset — sorterat efter åldersgrupp.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {PLAYLISTS.map(pl => (
              <div key={pl.age} style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid #f0ebee', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem', background: pl.color }}>
                  {pl.emoji}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#5910b6', marginBottom: '0.5rem' }}>{pl.age}</h2>
                  <p style={{ fontFamily: 'caraque-melted, sans-serif', color: '#7c7c7c', fontSize: '0.95rem', marginBottom: '1.25rem', flex: 1 }}>{pl.desc}</p>
                  <a
                    href={pl.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      backgroundColor: '#1DB954', color: 'white', fontFamily: 'caraque-melted, sans-serif',
                      fontWeight: 700, padding: '0.85rem', borderRadius: '1rem', textDecoration: 'none',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Öppna i Spotify
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3.5rem', backgroundColor: '#faf1ef', borderRadius: '2rem', padding: '2.5rem 2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#5910b6', marginBottom: '0.5rem' }}>
              Tips & erbjudanden till kalaset
            </p>
            <p style={{ fontFamily: 'caraque-melted, sans-serif', color: '#7c7c7c', marginBottom: '1.5rem' }}>
              Prenumerera på vårt nyhetsbrev — inga spamfärdiga mejl, bara bra tips.
            </p>
            <form style={{ display: 'flex', gap: '0.75rem', maxWidth: '380px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="din@email.se"
                style={{ flex: 1, border: '2px solid #f0ebee', borderRadius: '0.9rem', padding: '0.85rem 1.1rem', fontFamily: 'caraque-melted, sans-serif', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}>
                Ja tack!
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
