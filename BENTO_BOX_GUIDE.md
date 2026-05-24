# Bento Box Guide

## Komponenten är skapad! 🎉

Filen: `/app/components/BentoBox.tsx`

## Hur du använder den

### 1. Importera komponenten
```typescript
import BentoBox from './components/BentoBox'
```

### 2. Definiera din data
```typescript
const bentoItems = [
  {
    id: 'lekar',
    title: '20 st Kalaslekar',
    description: 'I varje nedladdning ingår',
    subtitle: 'Passar garanterat alla, ofta används 4-7 st under ett kalas',
    color: '#7C3AED', // Purple
    imageUrl: '/images/bento-lekar.jpg',
    span: 'half' // Takes 2/3 of width on desktop
  },
  {
    id: 'skriv',
    title: 'Skriv bara ut det du behöver',
    color: '#8B5CF6',
    span: 'normal' // Takes 1/3 of width
  },
  // ... more items
]
```

### 3. Använd den på hemsidan
```tsx
<BentoBox items={bentoItems} />
```

## Grid layout

Responsiv:
- **Mobil:** 1 kolumn (full width)
- **Tablet:** 2 kolumner
- **Desktop:** 3 kolumner (kan kombineras med span för större tiles)

```
Desktop layout (3 columns):
┌──────────┬──────────┬──────────┐
│ item     │ item     │ item     │ (span: 'normal')
├──────────┴──────────┼──────────┤
│ item (span: half)    │ item     │
└──────────┬──────────┴──────────┘
```

## Span-alternativ

- `'normal'` - 1/3 width på desktop
- `'half'` - 2/3 width på desktop  
- `'full'` - Full width (3/3)

## Assets du behöver från kalaseriet.se

1. **Bilder** från Bento Box-sektionen
   - Ladda ner från kalaseriet.se
   - Spara i `/public/images/`

2. **Färger** (använd samma color codes)
   - Purple: `#7C3AED`
   - Green: `#2D6B4F`
   - Blue: `#60A5FA`
   - Pink: `#F472B6`
   - etc.

3. **Lottie animationer** (om de finns)
   - Exportera som .json från Adobe After Effects
   - Spara i `/public/animations/`
   - Lägg URL i `animationUrl`-fältet

## Exempel: Integrera på hemsidan

```tsx
import BentoBox from './components/BentoBox'

export default function Home() {
  const bentoItems = [
    {
      id: 'lekar',
      title: '20 st Kalaslekar & aktiviteter',
      description: 'I varje nedladdning ingår',
      subtitle: 'Passar garanterat alla, ofta används 4-7 st under ett kalas',
      color: '#7C3AED',
      imageUrl: '/images/bento-lekar.jpg',
      span: 'half'
    },
    {
      id: 'skriv',
      title: 'Skriv bara ut det du behöver',
      color: '#8B5CF6',
      span: 'normal'
    },
    // ... lägg till resten
  ]

  return (
    <>
      {/* ... other sections */}
      <BentoBox items={bentoItems} />
      {/* ... other sections */}
    </>
  )
}
```

## Hur får du assets från den gamla sidan?

### Bilder
1. Högerklick på bilden på kalaseriet.se
2. "Spara bilden som..."
3. Spara i `/public/images/bento-*.jpg`

### Färger
1. Använd DevTools (F12)
2. Inspektera elementet
3. Kopiera background-color från CSS

### Text
Du måste skriva om texten själv för att undvika copyright. Men du kan:
- Läsa texten på den gamla sidan
- Skriva om den i dina egna ord
- Behålla samma budskap och ton

## Komponenten är responsiv ✅

✓ Mobil (1 kolumn)
✓ Tablet (2 kolumner)
✓ Desktop (3 kolumner med span-kontroll)
✓ Touch-friendly padding
✓ Animated backgrounds support
✓ Image backgrounds support

## Nästa steg

1. Samla assets från kalaseriet.se
2. Spara dem i `/public/images/` och `/public/animations/`
3. Uppdatera `bentoItems`-arrayen med din data
4. Importera och använd `<BentoBox items={bentoItems} />`
5. Testa på mobil, tablet och desktop! 📱

