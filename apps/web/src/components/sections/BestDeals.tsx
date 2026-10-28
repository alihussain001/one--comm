import { CATALOG_PRODUCTS } from '../../data/products';
import { formatMoney } from '../../lib/money';
import RatingStars from '../ui/RatingStars';

import headphonesPng from '../../assets/vecteezy_headphones-design-3d-rendering-for-product-mockup_17054078.png';
import shoesPng from '../../assets/vecteezy_white-sport-shoes-product-shot-on-transparent-background_59656239.png';
import hoodiePng from '../../assets/hodie.png';
import handbagPng from '../../assets/vecteezy_elegant-handbag-display-fashion-retail-store-product_70941750.png';
import sneakersPng from '../../assets/vecteezy_modern-grey-running-sneakers-with-navy-blue-trim-for_77848933.png';

interface Deal {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
}

const DEALS: Deal[] = [
  {
    id: 'deal-1',
    name: 'Premium Headphones 3D Render',
    image: headphonesPng,
    rating: 4,
    reviews: 1200,
    price: 999.99,
    originalPrice: 999.99,
  },
  {
    id: 'deal-2',
    name: 'Classic Grey Hoodie',
    image: hoodiePng,
    rating: 4,
    reviews: 509,
    price: 45.0,
  },
  {
    id: 'deal-3',
    name: 'Elegant Fashion Handbag',
    image: handbagPng,
    rating: 4,
    reviews: 100,
    price: 32.0,
    originalPrice: 48.0,
  },
  {
    id: 'deal-4',
    name: 'Modern Grey Running Sneakers',
    image: sneakersPng,
    rating: 4,
    reviews: 1100,
    price: 299.0,
  },
  {
    id: 'deal-5',
    name: 'White Sport Shoes',
    image: shoesPng,
    rating: 4.5,
    reviews: 157,
    price: 190.0,
  },
];

interface BestDealsProps {
  onAddToCart?: (product: (typeof CATALOG_PRODUCTS)[number]) => void;
}

export default function BestDeals({ onAddToCart }: BestDealsProps) {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Todays Best Deals For You!
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            View All
            <svg
              width="14"
              height="14"
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
          </a>
        </div>

        {/* Cards row */}
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {DEALS.map((deal, i) => {
            const discount =
              deal.originalPrice && deal.originalPrice > deal.price
                ? Math.round(
                    ((deal.originalPrice - deal.price) / deal.originalPrice) * 100
                  )
                : 0;

            return (
              <article
                key={deal.id}
                className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-shadow duration-150 hover:shadow-md md:w-auto"
              >
                {/* Image area */}
                <div className="relative flex items-center justify-center bg-white p-6">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors duration-150 hover:text-red-500"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="mx-auto h-44 w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 pb-4">
                  <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900">
                    {deal.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1">
                    <RatingStars value={deal.rating} size={14} />
                    <span className="text-xs text-gray-500">
                      ({deal.reviews})
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-gray-900 tabular-nums">
                      {formatMoney(Math.round(deal.price * 100), 'PKR')}
                    </span>
                    {discount > 0 && deal.originalPrice && (
                      <span className="text-xs text-gray-400 line-through tabular-nums">
                        {formatMoney(Math.round(deal.originalPrice * 100), 'PKR')}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart?.(
                        CATALOG_PRODUCTS[i % CATALOG_PRODUCTS.length]
                      )
                    }
                    className="mt-auto inline-flex min-h-[38px] w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}