import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'
import { notFound } from 'next/navigation'

// Blog post data - will be moved to CMS later
const BLOG_POSTS = [
  {
    slug: 'diy-kalaspase',
    title: 'DIY-kalaspåse: Roliga och budgetvänliga presenter till gästerna',
    excerpt: 'En bra kalaspåse behöver inte kosta skjortan. Här är våra bästa tips för att göra kreativa kalaspåsar som barnen älskar – utan att tömma plånboken.',
    category: 'Tips',
    date: '5 november 2024',
    emoji: '🎁',
    author: 'Kalaseriet Team',
    readTime: 8,
    content: `
# DIY-kalaspåse: Roliga och budgetvänliga presenter till gästerna

En bra kalaspåse är en klassisk avslutning på varje kalas. Men det behöver inte kosta det vita ur ögonen!
Här delar vi våra bästa tips för att skapa roliga och budgetvänliga kalaspåsar som gästerna älskar.

## Varför en kalaspåse?

En kalaspåse är mer än bara present – det är ett minnesmärke från en fantastisk dag. Den ger barnen något att minnas kalaset på
och visar att du bryr dig.

## Budget-vänliga presentidéer

### Godis och snacks
- Blandad godis (köp i bulk, det blir billigare)
- Popcorn i liten påse
- Fruktgummis
- Nötter eller frön

### Leksaker under 20 kr
- Små leksaker från Åhléns eller Clas Ohlson
- Blyertspennor i roliga färger
- Klistermärken
- Smålekar eller pussel

### DIY-presentidéer
- Hemgjord kaka eller cookies i liten påse
- Ritblock + blyertspennor
- Hemgjord fruktbomb (frukt i påse)
- Inspirationskort för hemma

## Paketerings-tips

1. **Använd vad du har hemma** – Papperspåsar, nätkassar eller gamla plastpåsar kan dekore s upp med klistermärken eller ritpennor
2. **Tema det** – Matcha kalaspåsen med ditt kalastema
3. **Lägg alla presenter tillsammans** – Det blir en större present än om varje sak är liten

## Budgetguidning

**Per kalaspåse: 30-50 kr**
- 4 småsaker per påse
- 1-2 godis/snacks
- Personlig klistermärke eller kort

**20 gäster = 600-1000 kr totalt**

## Slutsats

Med lite kreativitet och planering kan du göra fantastiska kalaspåsar på en budget.
Barnen bryr sig mycket mindre om priset än om det är en personlig och rolig present från ett jättebra kalas!

---

*Har du fler tips? Dela dina favoritidéer på Instagram @kalaseriet!*
    `,
  },
  {
    slug: 'checklista-barnkalas',
    title: 'Checklista: Allt du behöver tänka på inför barnkalaset',
    excerpt: 'En komplett checklista för barnkalaset – från inbjudningar och mat till lekar och kalaspåsar. Missa ingenting med vår guide.',
    category: 'Tips',
    date: '1 november 2024',
    emoji: '☑️',
    author: 'Kalaseriet Team',
    readTime: 10,
    content: `
# Checklista: Allt du behöver tänka på inför barnkalaset

Är du nervös för att glömma något före barnkalaset? Denna checklista hjälper dig att ha kontroll och
säkerställer att ingenting faller mellan stolarna.

## 4-6 veckor innan kalaset

- [ ] Bestäm datum och tid för kalaset
- [ ] Välj tema för kalaset
- [ ] Skapa gästlista
- [ ] Boka en plats (hem, park, salar)
- [ ] Köp eller ladda ner kalaspaket

## 2-3 veckor innan

- [ ] Skapa inbjudningskort
- [ ] Skicka inbjudningar (både digital och klassisk post)
- [ ] Planera menyn (mat och dryck)
- [ ] Börja shoppa för mat och dekorationer

## 1-2 veckor innan

- [ ] Bestäm och planera lekarna
- [ ] Köpa mat och dryck
- [ ] Köpa dekorationer
- [ ] Köpa kalaspåsar och presenter
- [ ] Meddela föräldrar om allergier/dietrestriktioner

## Dagen före

- [ ] Städa ordentligt
- [ ] Förbered matsalar och bord
- [ ] Prova alla spel och aktiviteter
- [ ] Förbered kärl för presenterbädd
- [ ] Ladda telefonen för fler foto

## Själva kalasdagen

### Morgonen före
- [ ] Väck barnet lugnt och förklara att det är dags för kalas
- [ ] Ha en lugn frukoost
- [ ] Se till att barnet är rent och piffigt

### En timme före gästernas ankomst
- [ ] Sätt på bakgrunds musik
- [ ] Tända ljus (om lämpligt)
- [ ] Öppna dörren för en varm välkomnst
- [ ] Ha något litet att ta när gästerna kommer (frukt, juice)

### Själva kalaset
- [ ] Börja med något lugnt (lek/aktivitet)
- [ ] Byt mellan roliga och lugna lekar
- [ ] Mat ungefär halvvägs genom
- [ ] Slut med lugn aktivitet och kalaspåsar
- [ ] Ta många foton!

## Efter kalaset
- [ ] Tacka gästerna för att de kom
- [ ] Rensa upp
- [ ] Skriv tack-kort till gästerna (frivilligt men fint)

---

Med denna checklista är du väl förberedd för ett fantastiskt kalas!
    `,
  }
]

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  return {
    title: `${post?.title || 'Blog'} – Kalaseriet`,
    description: post?.excerpt || 'Läs tipsen och inspirationen på Kalasbloggen'
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="pt-6 mb-8">
            <Breadcrumbs items={[
              { label: 'Kalasbloggen', href: '/kalasbloggen' },
              { label: post.title, href: '' }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="text-5xl mb-6">{post.emoji}</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} min läsning</span>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none mb-16">
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap font-normal">
              {post.content}
            </div>
          </article>

          {/* CTA */}
          <div className="border-t border-gray-100 pt-12">
            <div className="bg-violet-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Redo för ett oförglömligt kalas?
              </h3>
              <p className="text-gray-600 mb-6">
                Hitta ditt perfekta kalaspaket och börja planera idag.
              </p>
              <a href="/kalas" className="btn-primary inline-block">
                Se alla kalaspaket ›
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
