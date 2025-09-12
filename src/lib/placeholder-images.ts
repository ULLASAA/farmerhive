import data from './placeholder-images.json';

export type RentalItem = {
  id: string;
  name: string;
  description: string;
  category: 'tools' | 'seeds' | 'pesticides' | 'fertilizers' | 'other';
  price: number;
  condition: 'New' | 'Excellent' | 'Good' | 'Used';
  imageUrl: string;
  imageHint: string;
};

export const rentalItems: RentalItem[] = data.rentalItems;

export const categories: RentalItem['category'][] = [
  'tools',
  'seeds',
  'pesticides',
  'fertilizers',
  'other',
];
