'use client';

import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateSuggestions } from '@/app/actions';
import type { RentalItem } from '@/lib/placeholder-images';
import type { BargainingSuggestionOutput } from '@/ai/flows/bargaining-suggestions';
import { Loader2, Sparkles, Lightbulb, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const bargainFormSchema = z.object({
  price: z.coerce.number().positive('Price must be a positive number.'),
  duration: z.string().min(1, 'Please specify a duration.'),
  delivery: z.string().min(1, 'Please select a delivery option.'),
});

const bookingFormSchema = z.object({
  address: z.string().min(10, 'Please enter a full delivery address.'),
  paymentMethod: z.enum(['card', 'cash', 'transfer'], {
    required_error: 'You need to select a payment method.',
  }),
});

function BookingForm({ item, price }: { item: RentalItem, price: number }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      address: '123 Kisan Nagar, Anaj Mandi, Punjab 141001',
      paymentMethod: 'card',
    },
  });

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    console.log({
      itemId: item?.id,
      finalPrice: price,
      ...values,
    });
    toast({
      title: 'Booking Confirmed!',
      description: `Your rental of ${item.name} has been successfully booked.`,
    });
    router.push('/rent');
  }

  return (
    <div className="mt-4 space-y-4">
       <AlertTitle className="text-accent">Confirm Your Booking</AlertTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           <div className="rounded-md border bg-muted p-4">
                <p className="text-sm font-medium text-muted-foreground">Final Price</p>
                <p className="text-3xl font-bold">
                  ₹{price.toFixed(2)}{' '}
                  <span className="text-base font-normal">/ day</span>
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
              <FormItem>
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
          <Button type="submit" className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Confirm & Rent
          </Button>
        </form>
      </Form>
    </div>
  );
}


export default function BargainForm({ item }: { item: RentalItem }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] =
    useState<BargainingSuggestionOutput | null>(null);

  const form = useForm<z.infer<typeof bargainFormSchema>>({
    resolver: zodResolver(bargainFormSchema),
    defaultValues: {
      price: item.price * 0.9, // Default to 90% of listing price
      duration: '1 day',
      delivery: 'pickup',
    },
  });

  async function onSubmit(values: z.infer<typeof bargainFormSchema>) {
    setIsLoading(true);
    setSuggestion(null);

    const input = {
      item: item.name,
      condition: item.condition,
      ...values,
    };

    const result = await generateSuggestions(input);

    setIsLoading(false);
    if (result.success && result.data) {
      setSuggestion(result.data);
      toast({
        title: 'Suggestion Generated!',
        description: 'Check out the AI-powered negotiation advice below.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make Your Offer</CardTitle>
        <CardDescription>
          Submit your desired terms, and our AI assistant will provide negotiation advice.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Offered Price (₹/day)</FormLabel>
                  <FormControl>
                    <Input type="number" step="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3 days, 1 week" {...field} />
                  </FormControl>
                  <FormDescription>How long do you need the item?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Option</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a delivery method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pickup">I will pick it up</SelectItem>
                      <SelectItem value="delivery">Deliver to me</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Suggestion
            </Button>
          </CardFooter>
        </form>
      </Form>

      {suggestion && (
        <div className="p-4 pt-0">
          <Alert className="border-accent bg-accent/10">
            <Lightbulb className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent">AI Bargaining Assistant</AlertTitle>
            <AlertDescription className="space-y-4">
              <div>
                <p className="font-semibold">Suggested Price:</p>
                <p className="text-2xl font-bold text-primary">₹{suggestion.suggestedPrice.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/day</span></p>
              </div>
              <div>
                <p className="font-semibold">Suggested Terms:</p>
                <p>{suggestion.suggestedTerms}</p>
              </div>
              <div>
                <p className="font-semibold">Reasoning:</p>
                <p>{suggestion.reasoning}</p>
              </div>
              <BookingForm item={item} price={suggestion.suggestedPrice} />
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
