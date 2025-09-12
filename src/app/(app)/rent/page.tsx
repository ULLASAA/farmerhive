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
import { Badge } from '@/components/ui/badge';
import { rentalItems, type RentalItem } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function RentPage() {
  const filteredItems = rentalItems.filter(
    (item) => item.subcategory === 'tractors'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Available Tractors</h1>
        <div className="flex items-center gap-2">
             <Button asChild>
              <Link href="/rent/upload">
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload
              </Link>
            </Button>
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
              <div className="mb-2 flex items-start justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge variant="outline" className="ml-2 shrink-0">{item.condition}</Badge>
              </div>
               <Badge variant="secondary" className="capitalize">{item.category}</Badge>
               {item.subcategory && <Badge variant="secondary" className="capitalize ml-1">{item.subcategory}</Badge>}
              <CardDescription className="line-clamp-3 text-sm mt-2">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
                <p className="text-lg font-semibold text-primary">
                    Rs {item.price.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/{item.unit}</span>
                </p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/bargain/${item.id}`}>Details</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
