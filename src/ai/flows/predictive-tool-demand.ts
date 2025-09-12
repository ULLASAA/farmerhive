'use server';

/**
 * @fileOverview Predicts demand for agricultural tools based on region and season.
 *
 * - getPredictiveDemand - A function that generates tool demand predictions.
 */

import { ai } from '@/ai/genkit';
import {
  PredictiveDemandInputSchema,
  PredictiveDemandOutputSchema,
  type PredictiveDemandInput,
  type PredictiveDemandOutput,
} from '@/ai/schemas/predictive-tool-demand';

export async function getPredictiveDemand(input: PredictiveDemandInput): Promise<PredictiveDemandOutput> {
  return predictiveDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveDemandPrompt',
  input: { schema: PredictiveDemandInputSchema },
  output: { schema: PredictiveDemandOutputSchema },
  prompt: `You are an agricultural market analyst for a tool rental platform in India. Your task is to predict the demand for various tools for the upcoming season.

Analyze the provided information to forecast which tools will be in high, medium, or low demand. Base your reasoning on typical crop cycles, farming activities, and weather patterns associated with the season in the specified region.

Region: {{{region}}}
Season: {{{season}}}
Historical Rental Data Summary: {{{historicalData}}}

Focus on the top 3-4 most relevant tools for the season. Provide clear reasoning for each prediction.
`,
});

const predictiveDemandFlow = ai.defineFlow(
  {
    name: 'predictiveDemandFlow',
    inputSchema: PredictiveDemandInputSchema,
    outputSchema: PredictiveDemandOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
