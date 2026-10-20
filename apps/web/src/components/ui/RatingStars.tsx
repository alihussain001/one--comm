interface RatingStarsProps {
  value?: number;
  max?: number;
  size?: number;
  className?: string;
}

export default function RatingStars({
  value = 5,
  max = 5,
  size = 14,
  className = '',
}: RatingStarsProps) {
  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`Rated ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < Math.floor(value);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isFilled ? '#E11D48' : '#D1D5DB'}
            stroke={isFilled ? '#E11D48' : '#D1D5DB'}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}
