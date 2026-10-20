import { useState } from 'react';

interface WishlistButtonProps {
  initialActive?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

export default function WishlistButton({
  initialActive = false,
  onToggle,
  className = '',
}: WishlistButtonProps) {
  const [active, setActive] = useState(initialActive);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !active;
    setActive(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={active}
      className={`inline-flex items-center justify-center p-1.5 rounded-full transition-transform duration-150 hover:scale-110 active:scale-90 ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? '#E11D48' : 'none'}
        stroke={active ? '#E11D48' : '#6B7280'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
