import type { Category } from '../../data/categories';

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      className="group flex w-full min-w-[240px] snap-start items-center justify-between gap-4 rounded-2xl bg-gray-100 px-6 py-5 text-left transition-colors duration-150 hover:bg-gray-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[rgba(118,87,225,0.35)] sm:min-w-[260px]"
    >
      <span className="text-lg font-semibold text-gray-900 sm:text-xl">
        {category.label}
      </span>

      {/* Vertical pill image mask */}
      <div className="h-28 w-16 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-20">
        <img
          src={category.imageUrl}
          alt={category.label}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </button>
  );
}