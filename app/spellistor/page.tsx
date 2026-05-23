import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Spellistor – Kalaseriet',
  description: 'Perfekt musik till barnkalaset – Spotify-spellistor för varje åldersgrupp.',
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
      <main className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-violet-50 border-b border-violet-100 py-14 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Spellistor</h1>
            <p className="text-xl text-gray-500">
              Perfekt bakgrundsmusik till kalaset – sorterat efter åldersgrupp.
            </p>
          </div>
        </div>

        {/* Playlists */}
        <div className="max-w-4xl mx-auto px-4 py-14">
          <div className="grid sm:grid-cols-2 gap-6">
            {PLAYLISTS.map(pl => (
              <div key={pl.age} className="rounded-3xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all flex flex-col">
                <div
                  className="h-36 flex items-center justify-center text-7xl"
                  style={{ background: pl.color }}
                >
                  {pl.emoji}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{pl.age}</h2>
                  <p className="text-gray-500 text-sm mb-5 flex-1">{pl.desc}</p>
                  <a
                    href={pl.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold py-3 rounded-2xl transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Öppna i Spotify
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-violet-50 rounded-3xl p-8 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">Tips & erbjudanden till kalaset</p>
            <p className="text-gray-500 mb-6">Prenumerera på vårt nyhetsbrev – inga spamfärdiga mejl, bara bra tips.</p>
            <form className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="din@email.se"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED]"
              />
              <button type="submit" className="bg-[#7C3AED] hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
