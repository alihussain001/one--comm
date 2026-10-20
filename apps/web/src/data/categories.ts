export interface Category {
  id: string;
  label: string;
  imageUrl: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-earbud',
    label: 'Earbud',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-gaming',
    label: 'Gaming',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-wired',
    label: 'Wired',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-sport',
    label: 'Sport',
    imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-neckband',
    label: 'Neckband',
    imageUrl: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-over',
    label: 'Over',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80',
  },
];
