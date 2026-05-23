export default function SocialProof() {
  const stats = [
    {
      number: '5000+',
      label: 'Lyckliga föräldrar',
      emoji: '👨‍👩‍👧‍👦'
    },
    {
      number: '10000+',
      label: 'Barn som firat',
      emoji: '🎉'
    },
    {
      number: '4.9★',
      label: 'Genomsnittsbetyg',
      emoji: '⭐'
    },
    {
      number: '99%',
      label: 'Nöjda kunder',
      emoji: '✅'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl mb-2">{stat.emoji}</div>
          <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
            {stat.number}
          </p>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
