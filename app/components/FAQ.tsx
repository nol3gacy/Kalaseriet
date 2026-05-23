'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'Hur fungerar det? Hur får jag filerna?',
    answer: 'Efter köp får du direkt tillgång till dina filer via länk. Du kan ladda ner ett PDF-paket med allt material. Det tar bara några sekunder efter betalning!'
  },
  {
    question: 'Kan jag anpassa materialet med mitt barns namn?',
    answer: 'Ja! Du kan enkelt lägga till ditt barns namn, kalasdatum och värd i alla utskrivbara material med ett enkelt program som Word eller Google Docs.'
  },
  {
    question: 'Vad ingår i paketet?',
    answer: '20 kalaslekar, 20 festrecept med allergialternativ, inbjudningskort, bordsdekorationer, körschema, checklista, diplom och musikspellista på Spotify.'
  },
  {
    question: 'Kan jag skriva ut materialet hemma?',
    answer: 'Ja! Allt material är designat för vanlig hemskrivare. Du kan också ta filerna till en print-shop om du vill ha professionell utskrift.'
  },
  {
    question: 'Hur länge kan jag använda filerna?',
    answer: 'Du kan ladda ner och använda filerna så länge du vill. Det är en engångsköp – du betalar inte per år eller månad.'
  },
  {
    question: 'Vad är skillnaden mellan de olika åldergrupperna?',
    answer: 'Varje paket är speciellt designat för rätt åldersgrupp. Lekarna, recepten och svårighetsnivån är anpassad för hur gamla barnen är.'
  },
  {
    question: 'Kan jag få tillbaka mina pengar?',
    answer: 'Ja, vi erbjuder 100% pengarna tillbaka-garanti i 30 dagar. Inga frågor ställs. Kontakta oss bara på kontakt@kalaseriet.se'
  },
  {
    question: 'Vilka betalningsmetoder accepterar ni?',
    answer: 'Vi accepterar kort, Swish, Klarna och PayPal genom Stripe. Din betalning är helt säker och krypterad.'
  },
  {
    question: 'Är filerna tillgängliga på svenska?',
    answer: 'Ja, alla våra kalaspaket är helt på svenska. Vi är ett svenskt företag och allt innehål är skapat för svenska familjer.'
  },
  {
    question: 'Kan jag köpa flera paket samtidigt?',
    answer: 'Ja, du kan lägga flera paket i varukorg och köpa dem tillsammans. Det är smidigt om du arrangerar flera kalas!'
  }
]

export default function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Ofta ställda frågor
          </h2>
          <p className="text-gray-500">
            Hittar du inte svaret här? Kontakta oss på kontakt@kalaseriet.se
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-violet-300 transition-colors"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-900 text-base">{faq.question}</h3>
                <span className={`flex-shrink-0 ml-4 text-xl transition-transform duration-200 ${
                  expanded === i ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              {expanded === i && (
                <div className="px-6 pb-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-violet-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Har du mer frågor?</h3>
          <p className="text-gray-600 mb-6">Tveka inte att kontakta oss – vi är här för att hjälpa!</p>
          <a href="/kontakt" className="btn-primary inline-block">
            Kontakta oss ›
          </a>
        </div>
      </div>
    </section>
  )
}
