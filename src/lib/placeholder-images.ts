import data from './placeholder-images.json';

export type RentalItem = {
  id: string;
  name: string;
  description: string;
  category: 'tools' | 'seeds' | 'pesticides' | 'fertilizers' | 'other';
  subcategory?: string;
  price: number;
  unit: 'day' | 'hour' | 'bag' | 'container';
  condition: 'New' | 'Excellent' | 'Good' | 'Used';
  imageUrl: string;
  imageHint: string;
};

export const rentalItems: RentalItem[] = data.rentalItems;

export const categories: {
  name: RentalItem['category'];
  subcategories?: string[];
}[] = [
  {
    name: 'tools',
    subcategories: [
      'tractors',
      'gardening tools',
      'spraying equipment',
      'agricultural machinery',
    ],
  },
  {
    name: 'seeds',
    subcategories: ['grains', 'vegetables'],
  },
  {
    name: 'pesticides',
    subcategories: ['natural', 'chemical'],
  },
  {
    name: 'fertilizers',
    subcategories: ['nitrogen-based', 'potassium-based'],
  },
  { name: 'other' },
];

export const buyableCategories: RentalItem['category'][] = ['seeds', 'pesticides', 'fertilizers'];
