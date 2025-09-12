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
    subcategories: ['vegetable', 'fruit', 'grain'],
  },
  {
    name: 'pesticides',
    subcategories: ['herbicide', 'insecticide', 'fungicide'],
  },
  {
    name: 'fertilizers',
    subcategories: ['nitrogen', 'phosphate', 'potassium'],
  },
  { name: 'other' },
];

export const buyableCategories = ['seeds', 'pesticides', 'fertilizers'];
