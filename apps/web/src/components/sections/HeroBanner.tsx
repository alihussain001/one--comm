import heroGraphic from '../../assets/hero.png';

interface HeroBannerProps {
  onOrderNow?: () => void;
}

export default function HeroBanner({ onOrderNow }: HeroBannerProps) {
  return (
    <section className="bg-canvas">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .hero-fade-up { animation: heroFadeUp 0.7s ease-out both; }
        .hero-fade-in { animation: heroFadeIn 0.9s ease-out both; }
        .hero-float { animation: heroFloat 4s ease-in-out infinite; }
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.2s; }
        .hero-delay-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 px-4 py-16 md:px-8 md:py-24">
          {/* Soft blue glow behind the graphic */}
          <div className="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left: text content */}
            <div className="flex flex-col items-start text-left">
              <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl hero-fade-up">
                Elevate Your Shopping Journey
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base hero-fade-up hero-delay-1">
                Experience Sound in Its Purest Form
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 hero-fade-up hero-delay-2">
                <button
                  type="button"
                  onClick={onOrderNow}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-display text-[15px] font-bold text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                >
                  Shop Now
                </button>

                <button
                  type="button"
                  onClick={onOrderNow}
                  className="text-sm font-semibold text-white/90 transition-colors duration-150 hover:text-white hover:underline"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right: branded graphic with floating info badges */}
            <div className="relative flex items-center justify-center hero-fade-in hero-delay-3">
              {/* Soft blue glow */}
              <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-500/40 blur-3xl" />

              {/* Floating flat badges */}
              <div className="absolute -left-2 top-4 border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                40h Battery
              </div>
              <div className="absolute -right-2 bottom-6 border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Active ANC
              </div>

              <img
                src={heroGraphic}
                alt="One-Comm layers"
                className="hero-float relative h-72 w-auto object-contain md:h-96"
              />
            </div>
          </div>
      </div>
    </section>
  );
}