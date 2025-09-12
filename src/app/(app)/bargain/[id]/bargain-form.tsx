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
import { Loader2, Sparkles, Lightbulb, CreditCard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const bargainFormSchema = z.object({
  price: z.coerce.number().positive('Price must be a positive number.'),
  duration: z.string().min(1, 'Please specify a duration.'),
  delivery: z.string().min(1, 'Please select a delivery option.'),
  paymentMethod: z.enum(['card', 'cash', 'transfer'], {
    required_error: 'You need to select a payment method.',
  }),
});


export default function BargainForm({ item }: { item: RentalItem }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<BargainingSuggestionOutput | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof bargainFormSchema>>({
    resolver: zodResolver(bargainFormSchema),
    defaultValues: {
      price: item.price * 0.9, // Default to 90% of listing price
      duration: '1 day',
      delivery: 'pickup',
      paymentMethod: 'card',
    },
  });
  
  const { watch } = form;
  const watchedValues = watch();

  async function handleGenerateSuggestion() {
    setIsGenerating(true);
    setSuggestion(null);
    try {
      const result = await generateSuggestions({
        item: item.name,
        price: watchedValues.price,
        condition: item.condition,
        duration: watchedValues.duration,
        delivery: watchedValues.delivery,
        marketConditions: 'The local market is competitive, with rental prices for similar items varying by 15-20% based on condition and availability. Renters are currently looking for flexible duration options.'
      });

      if (result.success && result.data) {
        setSuggestion(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to generate suggestions.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsGenerating(false);
    }
  }


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
          Adjust the terms below and either get an AI suggestion or proceed to book.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
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

            {isGenerating && (
              <div className="flex items-center justify-center rounded-md border p-4">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Generating AI Suggestions...</span>
              </div>
            )}

            {suggestion && (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>AI Bargaining Assistant</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>
                    <strong>Suggested Price:</strong> Rs {suggestion.suggestedPrice.toFixed(2)} / day
                  </p>
                  <p>
                    <strong>Suggested Terms:</strong> {suggestion.suggestedTerms}
                  </p>
                   <p className="text-xs text-muted-foreground pt-2">
                    <Lightbulb className="mr-1 inline-block h-3 w-3" />
                    <strong>Reasoning:</strong> {suggestion.reasoning}
                  </p>
                </AlertDescription>
              </Alert>
            )}

          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
             <Button
                type="button"
                variant="outline"
                onClick={handleGenerateSuggestion}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get AI Suggestion
            </Button>
            
            <Separator />
            
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

            <Button type="submit" disabled={isLoading || isGenerating} className="w-full">
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
