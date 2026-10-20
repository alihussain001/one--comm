export type TabType = 'featured' | 'top-sellers' | 'top-review';

interface ProductTabsProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export default function ProductTabs({ activeTab, onChangeTab }: ProductTabsProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'top-sellers', label: 'Top Sellers' },
    { id: 'top-review', label: 'Top Review' },
  ];

  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="flex items-center gap-2.5 overflow-x-auto pb-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChangeTab(tab.id)}
            className={`rounded-full px-5 py-2 text-xs md:text-sm font-semibold transition-all duration-150 select-none ${
              isActive
                ? 'bg-[#5003C0] text-white shadow-sm'
                : 'border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
