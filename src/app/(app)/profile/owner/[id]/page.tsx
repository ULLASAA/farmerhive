'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { rentalItems, type RentalItem, buyableCategories, categories as allCategories, type Owner } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, MapPin, Phone, Star, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';

// This is the Client Component that handles state and interactivity.
function OwnerProfileClient({ owner, ownerItems }: { owner: Owner, ownerItems: RentalItem[] }) {
  const [filter, setFilter] = useState('all');
  
  const totalReviews = ownerItems.reduce((acc, item) => acc + item.reviews.count, 0);
  const averageRating = ownerItems.length > 0 
    ? ownerItems.reduce((acc, item) => acc + item.reviews.rating * item.reviews.count, 0) / totalReviews
    : 0;
  
  const ownerCategories = allCategories.filter(cat => 
    ownerItems.some(item => item.category === cat.name)
  );

  const filteredItems = ownerItems.filter(
    (item) => {
      if (filter === 'all') return true;
      const [category, subcategory] = filter.split(':');
      if (!subcategory) return item.category === category;
      return item.category === category && item.subcategory === subcategory;
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/rent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
             <CardHeader className="relative flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={owner.avatarUrl} alt={owner.name} />
                <AvatarFallback className="text-4xl">{owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <CardTitle className="text-2xl font-bold">{owner.name}</CardTitle>
                 <div className="mt-2 flex items-center justify-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">({totalReviews} reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
               <Separator className="my-4" />
               <div className="space-y-4">
                 <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <a href={`mailto:${owner.email}`} className="text-base text-primary hover:underline">
                      {owner.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <a href={`tel:${owner.phone}`} className="text-base text-primary hover:underline">
                      {owner.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="text-base">{owner.address}</p>
                  </div>
                </div>
               </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
                 <h2 className="text-2xl font-bold tracking-tight">{owner.name}'s Listings</h2>
                 <div className="w-full md:w-auto">
                    <Select onValueChange={setFilter} defaultValue="all">
                        <SelectTrigger className="w-full md:w-[220px]">
                        <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {ownerCategories.map((category) => (
                            <SelectGroup key={category.name}>
                            <SelectLabel className="capitalize">{category.name}</SelectLabel>
                            <SelectItem value={category.name} className="font-bold capitalize pl-8">All {category.name}</SelectItem>
                            {category.subcategories?.filter(sub => ownerItems.some(item => item.subcategory === sub)).map(sub => (
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                        <Badge variant="secondary" className={`absolute right-2 top-2 ${buyableCategories.includes(item.category) ? 'bg-blue-100 text-blue-800' : item.availability.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {buyableCategories.includes(item.category) ? 'For Sale' : item.availability.status}
                        </Badge>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-4 pb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                     <div className='flex gap-1 mt-1'>
                        <Badge variant="secondary" className="capitalize">{item.category}</Badge>
                        {item.subcategory && <Badge variant="secondary" className="capitalize">{item.subcategory}</Badge>}
                    </div>
                    <CardDescription className="line-clamp-2 text-sm mt-2">
                        {item.description}
                    </CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-2">
                        <p className="text-lg font-semibold text-primary">
                            Rs {item.price.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/{item.unit}</span>
                        </p>
                         <Button asChild size="sm" className={buyableCategories.includes(item.category) ? '' : 'bg-accent text-accent-foreground hover:bg-accent/90'}>
                             <Link href={buyableCategories.includes(item.category) ? `/book/${item.id}?price=${item.price}` : `/bargain/${item.id}`}>Details</Link>
                        </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

// This is the exported Server Component that fetches data.
export default function OwnerProfilePage({ params }: { params: { id: string } }) {
  const owner = rentalItems.find((item) => item.owner.id === params.id)?.owner;
  const ownerItems = rentalItems.filter((item) => item.owner.id === params.id);

  if (!owner) {
    notFound();
  }

  // The Server component fetches data and passes it to the Client Component
  return <OwnerProfileClient owner={owner} ownerItems={ownerItems} />;
}
