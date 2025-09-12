'use server';

/**
 * @fileOverview Provides AI-driven suggestions for price and rental terms on the bargaining page.
 *
 * - getBargainingSuggestion - A function that generates bargaining suggestions.
 * - BargainingSuggestionInput - The input type for the getBargainingSuggestion function.
 * - BargainingSuggestionOutput - The return type for the getBargainingSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BargainingSuggestionInputSchema = z.object({
  item: z.string().describe('The item being rented.'),
  price: z.number().describe('The offered rental price.'),
  condition: z.string().describe('The condition of the item (e.g., new, used, excellent).'),
  duration: z.string().describe('The desired rental duration (e.g., 1 day, 1 week).'),
  delivery: z.string().describe('Delivery options (e.g., pickup, delivery to renter).'),
  marketConditions: z.string().describe('Information about the local market conditions for similar rentals.'),
});
export type BargainingSuggestionInput = z.infer<typeof BargainingSuggestionInputSchema>;

const BargainingSuggestionOutputSchema = z.object({
  suggestedPrice: z.number().describe('The AI-suggested price for the rental.'),
  suggestedTerms: z.string().describe('AI suggestions for other rental terms to improve the agreement.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested price and terms.'),
});
export type BargainingSuggestionOutput = z.infer<typeof BargainingSuggestionOutputSchema>;

export async function getBargainingSuggestion(input: BargainingSuggestionInput): Promise<BargainingSuggestionOutput> {
  return bargainingSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bargainingSuggestionPrompt',
  input: {schema: BargainingSuggestionInputSchema},
  output: {schema: BargainingSuggestionOutputSchema},
  prompt: `You are an expert in rental agreements for agricultural tools and equipment.  Given the following information, provide a suggested price and rental terms that are fair to both the renter and the owner.

Item: {{{item}}}
Price Offered: {{{price}}}
Condition: {{{condition}}}
Duration: {{{duration}}}
Delivery: {{{delivery}}}
Market Conditions: {{{marketConditions}}}

Consider all factors to provide the best possible suggestions.

Format your output as a JSON object:
{
  "suggestedPrice": "...",
  "suggestedTerms": "...",
  "reasoning": "..."
}
`,
});

const bargainingSuggestionFlow = ai.defineFlow(
  {
    name: 'bargainingSuggestionFlow',
    inputSchema: BargainingSuggestionInputSchema,
    outputSchema: BargainingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
