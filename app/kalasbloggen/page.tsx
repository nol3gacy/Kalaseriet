import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Kalasbloggen – Kalaseriet',
  description: 'Tips, inspiration och idéer för ett perfekt barnkalas.',
}

const POSTS = [
  {
    slug: 'diy-kalaspase',
    title: 'DIY-kalaspåse: Roliga och budgetvänliga presenter till gästerna',
    excerpt: 'En bra kalaspåse behöver inte kosta skjortan. Här är våra bästa tips för att göra kreativa kalaspåsar som barnen älskar – utan att tömma plånboken.',
    category: 'Tips',
    date: 'November 2024',
    emoji: '🎁',
    color: '#fce7f3',
  },
  {
    slug: 'checklista-barnkalas',
    title: 'Checklista: Allt du behöver tänka på inför barnkalaset',
    excerpt: 'En komplett checklista för barnkalaset – från inbjudningar och mat till lekar och kalaspåsar. Missa ingenting med vår guide.',
    category: 'Tips',
    date: 'November 2024',
    emoji: '☑️',
    color: '#d1fae5',
  },
  {
    slug: 'skattjakt-tips',
    title: 'Skattjakt: Så skapar du en minnesvärd skattjakt för barnen',
    excerpt: 'En skattjakt är alltid en hit på barnkalaset! Här guidar vi dig steg för steg genom hur du skapar en spännande skattjakt hemma.',
    category: 'Tips',
    date: 'November 2024',
    emoji: '🗺️',
    color: '#fef3c7',
  },
  {
    slug: 'populara-lekar',
    title: 'Lekar: De 10 mest populära lekarna på barnkalas',
    excerpt: 'Vilka lekar funkar bäst på barnkalas? Vi har listat de absolut populäraste lekarna som passar alla åldrar – inomhus och utomhus.',
    category: 'Tips',
    date: 'November 2024',
    emoji: '🎮',
    color: '#dbeafe',
  },
  {
    slug: '10-tips-barnkalas',
    title: '10 tips för ett minnesvärt barnkalas',
    excerpt: 'Vad skiljer ett bra kalas från ett minnesvärts kalas? Vi delar med oss av våra 10 bästa tips som gör kalaset oförglömligt för barnen.',
    category: 'Tips',
    date: 'November 2024',
    emoji: '⭐',
    color: '#ede9fe',
  },
]

export default function KalasbloggenPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-violet-50 border-b border-violet-100 py-14 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Kalasbloggen</h1>
            <p className="text-xl text-gray-500">
              Bli inspirerad av andras kalas, mega-smarriga muffins & massa tips :-)
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-7">
            {POSTS.map((post, i) => (
              <a
                key={post.slug}
                href={`/kalasbloggen/${post.slug}`}
                className={`group rounded-3xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-xl transition-all flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <div
                  className={`flex items-center justify-center text-7xl ${i === 0 ? 'h-52' : 'h-40'}`}
                  style={{ background: post.color }}
                >
                  {post.emoji}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-violet-100 text-[#7C3AED] text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h2 className={`font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors mb-2 ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <span className="mt-4 text-[#7C3AED] text-sm font-semibold">Läs mer →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
