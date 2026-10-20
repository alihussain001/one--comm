import { useState } from 'react';
import CarouselArrows from '../ui/CarouselArrows';

interface HeroBannerProps {
  onOrderNow?: () => void;
}

export default function HeroBanner({ onOrderNow }: HeroBannerProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'SPECIAL COLLECTION 2024',
      description:
        'Experience music like never before with our curated selection of premium headphones. Crafted with acoustic precision and ergonomic luxury.',
      image:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80',
      badge: 'Crimson Studio Edition',
    },
    {
      title: 'PURE AUDIO PRECISION',
      description:
        'Industry-leading active noise cancellation with 40-hour battery life. Immersive sound tailored for communication, focus, and performance.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
      badge: 'Midnight Noise Cancelling',
    },
  ];

  const current = slides[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-12 pb-28 md:pt-16 md:pb-36 text-white">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[#AB03A9]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Left Arrow (Desktop) */}
        <div className="hidden lg:block absolute left-2 top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        </div>

        {/* Right Arrow (Desktop) */}
        <div className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          {/* Text Content */}
          <div className="flex flex-col items-start text-left z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.15]">
              {current.title}
            </h1>

            <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-white/80">
              {current.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={onOrderNow}
                className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-200 hover:bg-neutral-900 active:scale-95"
              >
                <span>Order Now</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>

              {/* Mobile Carousel Arrows */}
              <div className="lg:hidden">
                <CarouselArrows onPrev={handlePrev} onNext={handleNext} />
              </div>
            </div>
          </div>

          {/* Headphone Hero Visual */}
          <div className="relative flex items-center justify-center">
            {/* Soft backdrop glow behind product */}
            <div className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full bg-white/15 blur-2xl pointer-events-none" />

            <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 flex items-center justify-center transition-all duration-300">
              <img
                src={current.image}
                alt={current.badge}
                className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
