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
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { rentalItems, categories, buyableCategories as buyableCategoryNames, type RentalItem } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function BuyPage() {
  const [filter, setFilter] = useState('all');

  const buyableItems = rentalItems.filter(item => buyableCategoryNames.includes(item.category));
  
  const buyableCategories = categories.filter(c => buyableCategoryNames.includes(c.name));

  const filteredItems = buyableItems.filter(
    (item) => {
      if (filter === 'all') return true;
      const [category, subcategory] = filter.split(':');
      if (!subcategory) return item.category === category;
      return item.category === category && item.subcategory === subcategory;
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Available for Purchase</h1>
        <div className="w-full md:w-auto">
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {buyableCategories.map((category) => (
                <SelectGroup key={category.name}>
                  <SelectLabel className="capitalize">{category.name}</SelectLabel>
                  <SelectItem value={category.name} className="font-bold capitalize pl-8">All {category.name}</SelectItem>
                  {category.subcategories?.map(sub => (
                    <SelectItem key={`${category.name}:${sub}`} value={`${category.name}:${sub}`} className="capitalize pl-8">
                      {sub}
                    </SelectItem>
                  ))}
                </SelectGroup>
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
                 <Badge variant="secondary" className="absolute right-2 top-2 bg-green-100 text-green-800">
                    In Stock
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pb-2">
               <div className="mb-2 flex items-center justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                 <Badge variant="secondary" className="capitalize">{item.category}</Badge>
              </div>
              {item.subcategory && <Badge variant="secondary" className="capitalize -mt-1">{item.subcategory}</Badge>}
              <CardDescription className="line-clamp-2 text-sm mt-2">
                {item.description}
              </CardDescription>

              <Separator className="my-3" />
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.owner.avatarUrl} alt={item.owner.name} />
                  <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>Sold by {item.owner.name}</span>
              </div>
               <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{item.reviews.rating}</span>
                    <span className="text-muted-foreground text-sm">({item.reviews.count} reviews)</span>
                </div>

            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-2">
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
