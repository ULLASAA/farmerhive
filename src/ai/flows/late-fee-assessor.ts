'use server';

/**
 * @fileOverview Assesses late fees for overdue rental items.
 *
 * - assessLateFee - A function that calculates a penalty for an overdue item.
 * - LateFeeInput - The input type for the assessLateFee function.
 * - LateFeeOutput - The return type for the assessLateFee function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LateFeeInputSchema = z.object({
  itemName: z.string().describe('The name of the rented item.'),
  rentalPrice: z.number().describe('The original rental price per day.'),
  daysOverdue: z.number().int().positive().describe('The number of days the item is overdue.'),
  itemCondition: z.string().describe('The condition of the item when it was rented (e.g., New, Good, Used).'),
});
export type LateFeeInput = z.infer<typeof LateFeeInputSchema>;

const LateFeeOutputSchema = z.object({
  penaltyAmount: z.number().describe('The calculated penalty amount for the late return.'),
  reasoning: z.string().describe('The reasoning for the penalty amount, considering the item value and rental disruption.'),
});
export type LateFeeOutput = z.infer<typeof LateFeeOutputSchema>;

export async function assessLateFee(input: LateFeeInput): Promise<LateFeeOutput> {
  return lateFeeAssessorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lateFeePrompt',
  input: {schema: LateFeeInputSchema},
  output: {schema: LateFeeOutputSchema},
  prompt: `You are a fair but firm rental dispute arbitrator. Your task is to assess a late fee for an overdue rental item.

The penalty should be reasonable but also compensate the owner for the loss of rental income and potential disruption.

Consider the following factors:
- Item Name: {{{itemName}}}
- Original Rental Price (per day): Rs {{{rentalPrice}}}
- Days Overdue: {{{daysOverdue}}}
- Item Condition: {{{itemCondition}}}

Calculate a final penalty amount. A standard late fee is 150% of the daily rental rate for each day it is late. However, you can adjust this based on the context. For high-value items or extended delays, the penalty might be higher.

Provide a clear reasoning for your decision.
`,
});

const lateFeeAssessorFlow = ai.defineFlow(
  {
    name: 'lateFeeAssessorFlow',
    inputSchema: LateFeeInputSchema,
    outputSchema: LateFeeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
