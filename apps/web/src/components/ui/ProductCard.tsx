import type { CatalogProduct } from '../../data/products';
import RatingStars from './RatingStars';
import WishlistButton from './WishlistButton';
import { formatMoney } from '../../lib/money';

interface ProductCardProps {
  product: CatalogProduct;
  onAddToCart?: (product: CatalogProduct) => void;
  onSelect?: (product: CatalogProduct) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelect,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onSelect?.(product)}
      className="group relative flex flex-col justify-between rounded-card-asym border border-[#E5E7EB] bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product Image Area */}
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F9] p-3 transition-colors duration-200 group-hover:bg-[#F3F2F8]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#5003C0] shadow-sm backdrop-blur-xs">
            {product.color}
          </span>
        </div>
      </div>

      {/* Info & Meta */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm md:text-base font-semibold text-[#111827] line-clamp-1">
            {product.name}
          </h3>
          <WishlistButton />
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5">
          <RatingStars value={product.rating} size={13} />
          <span className="text-[11px] text-[#6B7280]">
            ( {product.reviewCount} Reviews )
          </span>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#F3F4F6] pt-3">
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold text-[#111827] tabular-nums">
              {formatMoney(product.priceMinor, product.currency)}
            </span>
            <span className="text-xs text-[#9CA3AF] line-through tabular-nums">
              {formatMoney(product.originalPriceMinor, product.currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="inline-flex items-center rounded-full border border-[#5003C0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#5003C0] shadow-xs transition-all duration-150 hover:bg-[#5003C0] hover:text-white active:scale-95"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
