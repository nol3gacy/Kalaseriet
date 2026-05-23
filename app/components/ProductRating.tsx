interface ProductRatingProps {
  rating: number // 0-5
  reviewCount: number
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
}

export default function ProductRating({
  rating,
  reviewCount,
  size = 'medium',
  showText = true
}: ProductRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating))
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {stars.map((isFilled, i) => (
          <span key={i} className={`${sizeClasses[size]} ${isFilled ? '⭐' : '☆'}`}>
            {isFilled ? '⭐' : '☆'}
          </span>
        ))}
      </div>
      {showText && (
        <div className={`${sizeClasses[size]} text-gray-600`}>
          <span className="font-semibold">{rating.toFixed(1)}</span>
          <span className="text-gray-400"> ({reviewCount})</span>
        </div>
      )}
    </div>
  )
}
