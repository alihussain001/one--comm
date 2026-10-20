interface CarouselArrowsProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export default function CarouselArrows({ onPrev, onNext, className = '' }: CarouselArrowsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 active:scale-95"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 active:scale-95"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
