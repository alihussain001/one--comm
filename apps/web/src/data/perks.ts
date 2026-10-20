export interface Perk {
  id: string;
  title: string;
  description: string;
  iconName: 'truck' | 'zap' | 'rotate-ccw' | 'users';
}

export const PERKS: Perk[] = [
  {
    id: 'perk-1',
    title: 'Free Delivery',
    description: 'On all orders across the country',
    iconName: 'truck',
  },
  {
    id: 'perk-2',
    title: 'Fast Delivery',
    description: 'Guaranteed 2-3 day shipping',
    iconName: 'zap',
  },
  {
    id: 'perk-3',
    title: '7 Days Return',
    description: 'Hassle-free 100% money back',
    iconName: 'rotate-ccw',
  },
  {
    id: 'perk-4',
    title: 'Member Discount',
    description: 'Special perks for repeat buyers',
    iconName: 'users',
  },
];
