import type { Category } from '../../data/categories';

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={() => onClick?.(category)}
      className="group flex flex-col items-center cursor-pointer select-none"
    >
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden rounded-tile-asym bg-neutral-900 shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md">
        <img
          src={category.imageUrl}
          alt={category.label}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <span className="mt-2.5 text-xs sm:text-sm font-medium text-[#111827] group-hover:text-[#5003C0] transition-colors duration-150">
        {category.label}
      </span>
    </div>
  );
}
