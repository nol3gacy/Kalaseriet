// From kalaseriet.se CMS export
export type FAQ = {
  question: string
  answer: string  // HTML allowed
  order: number
}

export const faqs: FAQ[] = [
  {
    question: 'Jag har ingen skrivare?',
    answer: '<p>Om du inte har en skrivare brukar vi rekommendera detta:</p><ul><li><strong>På jobbet</strong> – Kanske har du eller nån du känner möjlighet att skriva ut på jobbet</li><li><strong>Biblioteket</strong> – där kan man ofta skriva ut mot en liten kostnad</li><li>Din <strong>lokala butik</strong> eller <strong>internetcafé</strong> brukar ha utskriftstjänster</li><li>Tryckerier kan ofta hjälpa till, kolla om det finns något i närheten</li><li><a href="https://skrivutonline.se/" target="_blank" rel="noopener noreferrer">Skriv ut online</a> är en tjänst som hjälper dig att skriva ut, bara ladda upp PDF och välj antal</li></ul>',
    order: 1,
  },
  {
    question: 'Kan jag ändra mig efteråt?',
    answer: '<p>Vi har 100% nöjdhetsgaranti, så om du inte är nöjd efter att du genomfört kalaset så får du pengarna tillbaka genom att följa denna <a href="/feedback">länk</a>. Kommentera gärna vad ni inte gillade, vi älskar feedback!</p>',
    order: 2,
  },
  {
    question: 'Hur skriver jag ut?',
    answer: '<p>Lättast är från en dator och med t.ex. Acrobat Reader. Alla PDFer är i A4-format så bara välja antal och trycka skriv ut. Om möjligt skriv gärna ut i färg.</p>',
    order: 3,
  },
  {
    question: 'Passar det verkligen till denna ålder?',
    answer: '<p>Våra guider och PDFer är anpassade för den åldern den anger, ofta funkar lekarna för åldrarna precis intill och de går att anpassa lite efter förmågan. En idé är att testa innan kalaset.</p>',
    order: 4,
  },
  {
    question: 'Allergier eller äter specialkost?',
    answer: '<p>Om något eller några barn har allergier eller äter specialkost, se till att justera receptet utifrån vad denna tål. T.ex. så kan ni ersätta smör till veganskt alternativ och så vidare.</p>',
    order: 5,
  },
  {
    question: 'Hur får jag filerna?',
    answer: '<p>Direkt efter att köpet gjorts får du ett mail med länk till nedladdning. Om du inte ser något mail, kolla i skräpkorgen. Om du fortfarande inte hittar det, <a href="mailto:hej@kalaseriet.se">kontakta oss</a> så löser vi det brådskande.</p>',
    order: 6,
  },
]
