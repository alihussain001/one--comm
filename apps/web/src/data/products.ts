export interface CatalogProduct {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  priceMinor: number;
  originalPriceMinor: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tab: 'featured' | 'top-sellers' | 'top-review';
  inStock: boolean;
  color: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-1',
    name: 'Sport Headphones',
    tagline: 'Wireless Studio Edition',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 160000,
    currency: 'PKR',
    rating: 5,
    reviewCount: 12,
    tab: 'top-sellers',
    inStock: true,
    color: 'Matte Black',
  },
  {
    id: 'prod-2',
    name: 'Sport Headphones',
    tagline: 'Pro Active Noise Cancelling',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 165000,
    currency: 'PKR',
    rating: 5,
    reviewCount: 18,
    tab: 'top-sellers',
    inStock: true,
    color: 'Midnight Black',
  },
  {
    id: 'prod-3',
    name: 'Sport Headphones',
    tagline: 'Ultra Bass Boost',
    imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 160000,
    currency: 'PKR',
    rating: 4,
    reviewCount: 9,
    tab: 'top-sellers',
    inStock: true,
    color: 'Graphite Grey',
  },
  {
    id: 'prod-4',
    name: 'Sport Headphones',
    tagline: 'Deep Charcoal Finish',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 170000,
    currency: 'PKR',
    rating: 5,
    reviewCount: 15,
    tab: 'featured',
    inStock: true,
    color: 'Space Grey',
  },
  {
    id: 'prod-5',
    name: 'Sport Headphones',
    tagline: 'Crimson Beats Edition',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 160000,
    currency: 'PKR',
    rating: 5,
    reviewCount: 22,
    tab: 'featured',
    inStock: true,
    color: 'Vivid Red',
  },
  {
    id: 'prod-6',
    name: 'Sport Headphones',
    tagline: 'Ergonomic Marathon Fit',
    imageUrl: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&auto=format&fit=crop&q=80',
    priceMinor: 150000,
    originalPriceMinor: 160000,
    currency: 'PKR',
    rating: 5,
    reviewCount: 14,
    tab: 'top-review',
    inStock: true,
    color: 'Classic Black',
  },
];
