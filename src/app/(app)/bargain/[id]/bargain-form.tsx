'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Loader2, Sparkles, Lightbulb, ShoppingCart, CreditCard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const bargainFormSchema = z.object({
  price: z.coerce.number().positive('Price must be a positive number.'),
  duration: z.string().min(1, 'Please specify a duration.'),
  delivery: z.string().min(1, 'Please select a delivery option.'),
});


export default function BargainForm({ item }: { item: RentalItem }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    // Navigate to the booking page with the offered price
    router.push(`/book/${item.id}?price=${values.price}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make Your Offer</CardTitle>
        <CardDescription>
          Submit your desired terms to proceed with the booking.
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
                  <FormLabel>Your Offered Price (Rs/day)</FormLabel>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1 day">1 Day</SelectItem>
                      <SelectItem value="3 days">3 Days</SelectItem>
                      <SelectItem value="1 week">1 Week</SelectItem>
                      <SelectItem value="2 weeks">2 Weeks</SelectItem>
                      <SelectItem value="1 month">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
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
                        <SelectValue placeholder="Select a delivery option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pickup">I will pick it up</SelectItem>
                      <SelectItem value="delivery">Deliver to my address</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Confirm & Pay
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
