import headphonesPng from '../../assets/vecteezy_headphones-design-3d-rendering-for-product-mockup_17054078.png';
import hoodiePng from '../../assets/vecteezy_grey-hoodie-mockup-casual-wear-comfortable-style-against_55753502.png';
import sneakersPng from '../../assets/vecteezy_modern-grey-running-sneakers-with-navy-blue-trim-for_77848933.png';

interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgClass: string;
  textClass: string;
  buttonClass: string;
  badge?: string;
  badgeClass?: string;
}

const PROMOS: PromoCard[] = [
  {
    id: 'promo-audio',
    title: 'Immersive Sound',
    subtitle: 'Premium headphones for every moment',
    imageUrl: headphonesPng,
    bgClass: 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700',
    textClass: 'text-white',
    buttonClass: 'bg-white text-purple-700 hover:bg-purple-50',
    badge: '30% OFF',
    badgeClass: 'bg-yellow-400 text-yellow-900',
  },
  {
    id: 'promo-fashion',
    title: 'Street Style',
    subtitle: 'Hoodies, tees & caps built for comfort',
    imageUrl: hoodiePng,
    bgClass: 'bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600',
    textClass: 'text-white',
    buttonClass: 'bg-white text-rose-600 hover:bg-rose-50',
    badge: 'NEW',
    badgeClass: 'bg-white/30 text-white',
  },
  {
    id: 'promo-outdoor',
    title: 'Adventure Ready',
    subtitle: 'Gear up with bottles & sneakers',
    imageUrl: sneakersPng,
    bgClass: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600',
    textClass: 'text-white',
    buttonClass: 'bg-white text-teal-700 hover:bg-teal-50',
    badge: 'BEST VALUE',
    badgeClass: 'bg-amber-300 text-amber-900',
  },
];

interface FeaturedPromosProps {
  onShopNow?: (id: string) => void;
}

export default function FeaturedPromos({ onShopNow }: FeaturedPromosProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROMOS.map((promo, index) => (
          <article
            key={promo.id}
            className={`group relative overflow-hidden rounded-3xl ${promo.bgClass} p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.25)]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

            {/* Badge */}
            {promo.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${promo.badgeClass}`}
              >
                {promo.badge}
              </span>
            )}

            {/* Title */}
            <h3
              className={`relative z-10 font-display text-2xl font-extrabold uppercase tracking-tight ${promo.textClass}`}
            >
              {promo.title}
            </h3>
            <p
              className={`relative z-10 mt-1 text-sm font-medium ${promo.textClass} opacity-80`}
            >
              {promo.subtitle}
            </p>

            {/* Product Image */}
            <div className="relative z-10 my-6 flex justify-center">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="h-44 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Button */}
            <div className="relative z-10 flex justify-center">
              <button
                type="button"
                onClick={() => onShopNow?.(promo.id)}
                className={`rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-150 ${promo.buttonClass} active:scale-95`}
              >
                Shop now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}