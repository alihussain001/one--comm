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
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-16 pb-12">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]">
          Headphone Categories
        </h2>

        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#5003C0] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#4302a2] active:scale-95"
        >
          <span>See All</span>
          <svg
            width="12"
            height="12"
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

      {/* Category Tiles Grid / Horizontal Row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
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
