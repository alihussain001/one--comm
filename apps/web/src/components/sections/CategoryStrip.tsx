import { CATEGORIES, type Category } from '../../data/categories';
import CategoryCard from '../ui/CategoryCard';

interface CategoryStripProps {
  onSelectCategory?: (category: Category) => void;
  onSeeAll?: () => void;
}

export default function CategoryStrip({
  onSelectCategory,
  onSeeAll,
}: CategoryStripProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Header Row */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Explore Popular Categories
        </h2>

        <button
          type="button"
          onClick={onSeeAll}
          className="hidden items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:text-primary sm:inline-flex"
        >
          <span>See All</span>
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Category cards row (scrollable on small screens) */}
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={onSelectCategory}
          />
        ))}
      </div>
    </section>
  );
}