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
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  price: z.coerce.number().positive('Price must be a positive number.'),
  duration: z.string().min(1, 'Please specify a duration.'),
  delivery: z.string().min(1, 'Please select a delivery option.'),
});

export default function BargainForm({ item }: { item: RentalItem }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] =
    useState<BargainingSuggestionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: item.price * 0.9, // Default to 90% of listing price
      duration: '1 day',
      delivery: 'pickup',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                  <FormLabel>Your Offered Price ($/day)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
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
                <p className="text-2xl font-bold text-primary">${suggestion.suggestedPrice.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/day</span></p>
              </div>
              <div>
                <p className="font-semibold">Suggested Terms:</p>
                <p>{suggestion.suggestedTerms}</p>
              </div>
              <div>
                <p className="font-semibold">Reasoning:</p>
                <p>{suggestion.reasoning}</p>
              </div>
              <Button asChild className="mt-4 w-full">
                <Link href={`/book/${item.id}?price=${suggestion.suggestedPrice.toFixed(2)}`}>
                  Proceed to Book
                </Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
