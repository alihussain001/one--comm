export interface Category {
  id: string;
  label: string;
  imageUrl: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-clothes',
    label: 'Clothes',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-sneakers',
    label: 'Sneakers',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-watches',
    label: 'Watches',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-handbags',
    label: 'Handbags',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80',
  },
];