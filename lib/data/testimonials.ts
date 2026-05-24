// From kalaseriet.se CMS export
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
    quote: 'Jeg er så tilfreds med denne vejledning! Att ladda ner den var enkelt, och idéerna till lekar är verkligen söta. Min dotter fyller snart sex år, och jag är säker på att hennes födelsedagskalas kommer att bli fantastiskt tack vare denna guide!',
    stars: 5,
  },
  {
    name: 'Maja från Enköping',
    quote: 'Hvor er jeg glad for denne guide! Det var så let at downloade, og mine børn elsker allerede legene. Tak for de fantastiske idéer - det gjorde fødselsdagsfesten til et hit!',
    stars: 5,
  },
  {
    name: 'Minna från Örebro',
    quote: 'Vilken pärla av en guide! Jag köpte den för min femåriga dotters kalas, och det var den bästa investeringen. Lekarna var så kreativa och barnen älskade dem. Tack så mycket!',
    stars: 4,
  },
  {
    name: 'Olaf från Lysekil',
    quote: 'Denne guiden overgikk mine forventninger! Jeg kjøpte den for min syvårings bursdag, og det ble en suksess. Lekene var engasjerende, og det var lett å organisere. Takk skal du ha!',
    stars: 5,
  },
  {
    name: 'Olof från Sverige',
    quote: 'Wow, detta är verkligen en pärla! Jag har tre barn i åldrarna 4, 7 och 8 år, och guiden ger mig så många alternativ att välja mellan. De blev så entusiastiska när jag delade några av idéerna med dem. En riktigt bra investering!',
    stars: 5,
  },
  {
    name: 'Oskar från Köpenhamn',
    quote: 'Jeg er virkelig tilfreds med købet af denne guide! Min 8-årige søn havde den bedste fødselsdag med de lege, der blev foreslået. En stor tak for at gøre det så nemt og sjovt for os!',
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
]

// Deterministic shuffle by seed (product slug) so SSR == CSR
export function randomTestimonials(seed: string, count = 4): Testimonial[] {
  const seedNum = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const arr = [...testimonials]
  // Fisher-Yates with deterministic "random"
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
