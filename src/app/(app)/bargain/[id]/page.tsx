import { rentalItems, type RentalItem } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
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
import BargainForm from './bargain-form';
import { ArrowLeft, Star, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function BargainPage({ params }: { params: { id: string } }) {
  const item = rentalItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
       <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/rent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rentals
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Card className="overflow-hidden">
            <div className="relative h-80 w-full">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                data-ai-hint={item.imageHint}
              />
               <Badge variant="secondary" className={`absolute right-3 top-3 text-sm ${item.availability.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.availability.status}
                </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{item.name}</CardTitle>
                <Badge variant="outline" className="text-sm">
                  {item.condition}
                </Badge>
              </div>
              <CardDescription className="capitalize">{item.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
               <Separator className="my-4" />
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.owner.avatarUrl} alt={item.owner.name} />
                      <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">Owner</p>
                        <p className="text-muted-foreground">{item.owner.name}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Rating</p>
                        <p className="text-muted-foreground">{item.reviews.rating}/5 ({item.reviews.count} reviews)</p>
                    </div>
                </div>
                 {item.availability.status === 'Rented Out' && (
                  <div className="flex items-center gap-3 text-amber-600">
                    <CalendarDays className="h-5 w-5" />
                     <div>
                        <p className="font-semibold text-sm">Next Available</p>
                        <p>{item.availability.nextAvailable}</p>
                    </div>
                  </div>
                )}
               </div>
              <p className="mt-6 text-3xl font-bold text-primary">
                Rs {item.price.toFixed(2)}
                <span className="text-base font-normal text-muted-foreground">
                  /{item.unit} (listed)
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
            <BargainForm item={item} />
        </div>
      </div>
    </div>
  );
}
