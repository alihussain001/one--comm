import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/sections/HeroBanner';
import PerksBar from '../components/sections/PerksBar';
import CategoryStrip from '../components/sections/CategoryStrip';
import ProductGrid from '../components/sections/ProductGrid';
import { useAuth } from '../auth/AuthContext';
import type { CatalogProduct } from '../data/products';
import type { Category } from '../data/categories';

export default function ProductPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOrderNow = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout', { state: { qty: 1 } });
  };

  const handleAddToCart = (product: CatalogProduct) => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout', {
      state: {
        qty: 1,
        productId: product.id,
        productName: product.name,
      },
    });
  };

  const handleSelectCategory = (_category: Category) => {
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeAllCategories = () => {
    const categoriesEl = document.getElementById('categories');
    if (categoriesEl) {
      categoriesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#5003C0] selection:text-white">
      {/* 1. Transparent Header (over Hero) */}
      <Header />

      {/* 2. Hero Section (Gradient Banner) */}
      <main id="main-content">
        <HeroBanner onOrderNow={handleOrderNow} />

        {/* 3. Floating Perks Bar */}
        <div id="perks">
          <PerksBar />
        </div>

        {/* 4. Headphone Categories Strip */}
        <div id="categories">
          <CategoryStrip
            onSelectCategory={handleSelectCategory}
            onSeeAll={handleSeeAllCategories}
          />
        </div>

        {/* 5. Products Section (Tabs + Asymmetric Cards Grid) */}
        <div id="products">
          <ProductGrid
            onAddToCart={handleAddToCart}
            onSelectProduct={handleAddToCart}
          />
        </div>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
