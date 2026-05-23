export default function Testimonials() {
  const testimonials = [
    {
      quote: "Helt fantastisk sparar tid och pengar. Mina barn älskade kalaset!",
      author: "Maria K.",
      role: "Mamma till 6-åring",
      emoji: "⭐⭐⭐⭐⭐"
    },
    {
      quote: "Professionellt genomfört och så enkelt att anpassa med barnets namn.",
      author: "Sophie L.",
      role: "Arrangerade piratkalaset",
      emoji: "⭐⭐⭐⭐⭐"
    },
    {
      quote: "Snabbt att ladda ner, bra kvalitet på allt material. Mycket nöjd!",
      author: "Anders P.",
      role: "Pappa till 5-åring",
      emoji: "⭐⭐⭐⭐⭐"
    },
    {
      quote: "Sparade mig flera timmar med planering. Kalaset blev helt fantastiskt!",
      author: "Emma T.",
      role: "Arrangerade discokalaset",
      emoji: "⭐⭐⭐⭐⭐"
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Så älskar föräldrar Kalaseriet
          </h2>
          <p className="text-gray-500 text-sm">
            Läs vad andra föräldrar tycker om våra kalaspaket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-violet-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
                <span className="text-xl">{testimonial.emoji}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
