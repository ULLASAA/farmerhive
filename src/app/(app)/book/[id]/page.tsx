'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { notFound } from 'next/navigation';
import { rentalItems } from '@/lib/placeholder-images';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

const formSchema = z.object({
  address: z.string().min(10, 'Please enter a full delivery address.'),
  paymentMethod: z.enum(['card', 'cash', 'transfer'], {
    required_error: 'You need to select a payment method.',
  }),
});

export default function BookPage({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const price = searchParams.get('price');
  
  const item = rentalItems.find((i) => i.id === id);
  
  if (!item) {
    notFound();
  }

  const finalPrice = price ? parseFloat(price) : item.price;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '123 Kisan Nagar, Anaj Mandi, Punjab 141001',
      paymentMethod: 'card',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      itemId: item?.id,
      finalPrice,
      ...values,
    });
    toast({
      title: 'Booking Confirmed!',
      description: `Your rental of ${item.name} has been successfully booked.`,
    });
    router.push('/rent');
  }

  return (
    <div className="container mx-auto flex max-w-2xl items-center justify-center py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm Your Booking</CardTitle>
          <CardDescription>
            Finalize the details for your rental of{' '}
            <span className="font-semibold text-primary">{item.name}</span>.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="rounded-md border bg-muted p-4">
                <p className="text-sm font-medium text-muted-foreground">Final Price</p>
                <p className="text-3xl font-bold">
                  Rs {finalPrice.toFixed(2)}{' '}
                  <span className="text-base font-normal">/ {item.unit}</span>
                </p>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cash" />
                          </FormControl>
                          <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="transfer" />
                          </FormControl>
                          <FormLabel className="font-normal">Bank Transfer (UPI)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Confirm & Book
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
