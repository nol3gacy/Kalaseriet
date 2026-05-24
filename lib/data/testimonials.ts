// Reviews — alla på svenska från svenska orter
export type Testimonial = {
  name: string
  quote: string
  stars: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Elin från Stockholm',
    quote: 'Åh, jag är så nöjd med den här guiden! Det var superenkelt att ladda ner den, och innehållet är verkligen fantastiskt! Mina tvååringar älskar kalaslekar, och guiden ger så många roliga idéer. Tack så mycket för detta!',
    stars: 5,
  },
  {
    name: 'Gustav från Bro',
    quote: 'Tack för denna fantastiska guide! Jag har två barn, 4 och 6 år gamla, och de älskade verkligen kalaslekarna. Guiden var lätt att förstå och full av kreativa idéer. Rekommenderas starkt!',
    stars: 4,
  },
  {
    name: 'Livia från Södertälje',
    quote: 'Jag är så nöjd med den här guiden! Att ladda ner den var enkelt, och idéerna till lekar är verkligen söta. Min dotter fyller snart sex år, och jag är säker på att hennes födelsedagskalas kommer att bli fantastiskt tack vare denna guide!',
    stars: 5,
  },
  {
    name: 'Maja från Enköping',
    quote: 'Vad glad jag är för den här guiden! Det var så lätt att ladda ner, och mina barn älskar redan lekarna. Tack för de fantastiska idéerna – det gjorde födelsedagskalaset till en succé!',
    stars: 5,
  },
  {
    name: 'Minna från Örebro',
    quote: 'Vilken pärla av en guide! Jag köpte den för min femåriga dotters kalas, och det var den bästa investeringen. Lekarna var så kreativa och barnen älskade dem. Tack så mycket!',
    stars: 4,
  },
  {
    name: 'Olaf från Lysekil',
    quote: 'Den här guiden överträffade mina förväntningar! Jag köpte den för min sjuårings födelsedag, och det blev en succé. Lekarna var engagerande och det var lätt att organisera. Tack så mycket!',
    stars: 5,
  },
  {
    name: 'Olof från Malmö',
    quote: 'Wow, detta är verkligen en pärla! Jag har tre barn i åldrarna 4, 7 och 8 år, och guiden ger mig så många alternativ att välja mellan. De blev så entusiastiska när jag delade några av idéerna med dem. En riktigt bra investering!',
    stars: 5,
  },
  {
    name: 'Oskar från Göteborg',
    quote: 'Jag är verkligen nöjd med köpet av denna guide! Min 8-åriga son hade den bästa födelsedagen med lekarna som föreslogs. Ett stort tack för att ni gjorde det så enkelt och roligt för oss!',
    stars: 4,
  },
  {
    name: 'Sofie från Umeå',
    quote: 'Hej! Jag köpte guiden för min 8-åriga sons födelsedagsfest, och det var en hit! Han och hans vänner hade så roligt med lekarna. Tack för att ni gjorde kalaset så minnesvärt!',
    stars: 5,
  },
  {
    name: 'Viggo från Norrköping',
    quote: 'Guiden är verkligen fantastisk! Jag har en femårig pojke, och han letar alltid efter nya spel. Guiden har många kreativa lekar som jag aldrig hade tänkt på. Ett stort tack till er för den här fantastiska produkten!',
    stars: 5,
  },
  {
    name: 'Hanna från Linköping',
    quote: 'Helt galet bra! Sparade så mycket tid och stress inför min dotters 6-årskalas. Allting var färdigt – inbjudan, lekar, recept. Jag bara skrev ut och fixade. Tack!',
    stars: 5,
  },
  {
    name: 'Petter från Västerås',
    quote: 'Jag är ingen pyssel-pappa precis, så det här paketet räddade verkligen min sons piratkalas. Bra schema, kul lekar och fina dekorationer. Barnen fnissade hela kvällen.',
    stars: 5,
  },
]

// Deterministic shuffle by seed (product slug) so SSR == CSR
export function randomTestimonials(seed: string, count = 4): Testimonial[] {
  const seedNum = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const arr = [...testimonials]
  let s = seedNum
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, count)
}
