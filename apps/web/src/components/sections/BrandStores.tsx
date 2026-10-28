const BRANDS = [
  { id: 'sony', name: 'Sony', domain: 'sony.com', letter: 'S', color: 'bg-blue-600' },
  { id: 'bose', name: 'Bose', domain: 'bose.com', letter: 'B', color: 'bg-gray-900' },
  { id: 'jbl', name: 'JBL', domain: 'jbl.com', letter: 'J', color: 'bg-orange-500' },
  { id: 'samsung', name: 'Samsung', domain: 'samsung.com', letter: 'S', color: 'bg-blue-500' },
  { id: 'apple', name: 'Apple', domain: 'apple.com', letter: 'A', color: 'bg-gray-800' },
  { id: 'beats', name: 'Beats', domain: 'beatsbydre.com', letter: 'B', color: 'bg-red-600' },
  { id: 'sennheiser', name: 'Sennheiser', domain: 'sennheiser.com', letter: 'S', color: 'bg-gray-700' },
  { id: 'jvc', name: 'JVC', domain: 'jvc.com', letter: 'J', color: 'bg-indigo-600' },
];

export default function BrandStores() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-heading md:text-3xl">
        Explore Official Brand Stores
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {BRANDS.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-4 text-left transition-colors duration-150 hover:bg-gray-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[rgba(118,87,225,0.35)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
              <img
                src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=64`}
                alt={brand.name}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {brand.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                Delivery in within 24 hours
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}