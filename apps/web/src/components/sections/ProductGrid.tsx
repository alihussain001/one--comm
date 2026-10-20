import { useState } from 'react';
import { CATALOG_PRODUCTS, type CatalogProduct } from '../../data/products';
import ProductTabs, { type TabType } from './ProductTabs';
import ProductCard from '../ui/ProductCard';

interface ProductGridProps {
  onAddToCart?: (product: CatalogProduct) => void;
  onSelectProduct?: (product: CatalogProduct) => void;
}

export default function ProductGrid({
  onAddToCart,
  onSelectProduct,
}: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>('top-sellers');

  const filteredProducts = CATALOG_PRODUCTS.filter((p) => p.tab === activeTab);

  // If a tab has fewer items, show all catalog items gracefully
  const displayedProducts =
    filteredProducts.length > 0 ? filteredProducts : CATALOG_PRODUCTS;

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-4 pb-20">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827] mb-6">
        All Headphones
      </h2>

      {/* Tabs */}
      <div className="mb-8">
        <ProductTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}
