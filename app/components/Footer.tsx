export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-white text-xl font-bold font-[caraque-solid]">Kalaseriet</span>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Sveriges roligaste digitala kalaspaket för barn 4–8 år. Ladda ner, skriv ut och fira!
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.instagram.com/kalaseriet" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-700 hover:bg-[#7C3AED] flex items-center justify-center transition-colors text-sm">
              📸
            </a>
            <a href="https://www.facebook.com/kalaseriet" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-700 hover:bg-[#7C3AED] flex items-center justify-center transition-colors text-sm">
              👍
            </a>
            <a href="https://www.tiktok.com/@kalaseriet" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-700 hover:bg-[#7C3AED] flex items-center justify-center transition-colors text-sm">
              🎵
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Kalas</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/kalas" className="hover:text-white transition-colors">Alla kalas</a></li>
            <li><a href="/#populara" className="hover:text-white transition-colors">Populära kalas</a></li>
            <li><a href="/spellistor" className="hover:text-white transition-colors">Spellistor</a></li>
            <li><a href="/kalasbloggen" className="hover:text-white transition-colors">Kalasbloggen</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Info</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/sa-funkar-det" className="hover:text-white transition-colors">Så funkar det</a></li>
            <li><a href="/om-kalaseriet" className="hover:text-white transition-colors">Om Kalaseriet</a></li>
            <li><a href="/kontakt" className="hover:text-white transition-colors">Kontakta oss</a></li>
            <li><a href="/feedback" className="hover:text-white transition-colors">Lämna feedback</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Juridiskt</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/villkor" className="hover:text-white transition-colors">Köpvillkor</a></li>
            <li><a href="/villkor#integritet" className="hover:text-white transition-colors">Integritetspolicy</a></li>
            <li><a href="/villkor#cookies" className="hover:text-white transition-colors">Cookiepolicy</a></li>
          </ul>
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-2">Tips & erbjudanden</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="din@email.se"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]"
              />
              <button type="submit" className="bg-[#7C3AED] hover:bg-violet-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Kalaseriet · Allt innehåll är skyddat av upphovsrätt
      </div>
    </footer>
  )
}
