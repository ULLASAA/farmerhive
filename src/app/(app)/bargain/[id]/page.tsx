import { rentalItems, type RentalItem } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BargainForm from './bargain-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
              <p className="mt-4 text-3xl font-bold text-primary">
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
