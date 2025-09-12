'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { rentalItems, categories, type RentalItem } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const buyableCategories = ['seeds', 'pesticides', 'fertilizers'];

export default function BuyPage() {
  const [filter, setFilter] = useState('all');

  const buyableItems = rentalItems.filter(item => buyableCategories.includes(item.category));

  const filteredItems = buyableItems.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Available for Purchase</h1>
        <div className="w-full md:w-auto">
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {buyableCategories.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item: RentalItem) => (
          <Card
            key={item.id}
            className="flex flex-col overflow-hidden transition-all hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  data-ai-hint={item.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-2 flex items-center justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge variant="secondary" className="capitalize">{item.category}</Badge>
              </div>
              <CardDescription className="line-clamp-3 text-sm">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
                <p className="text-lg font-semibold text-primary">
                    Rs {item.price.toFixed(2)}
                </p>
                <Button asChild>
                    <Link href={`/book/${item.id}?price=${item.price.toFixed(2)}`}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
