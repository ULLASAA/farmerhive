'use server';

/**
 * @fileOverview Predicts demand for agricultural tools based on region and season.
 *
 * - getPredictiveDemand - A function that generates tool demand predictions.
 * - PredictiveDemandInput - The input type for the getPredictiveDemand function.
 * - PredictiveDemandOutput - The return type for the getPredictiveDemand function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const PredictiveDemandInputSchema = z.object({
  region: z.string().describe('The agricultural region, e.g., Punjab.'),
  season: z.enum(['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)']).describe('The current farming season.'),
  historicalData: z
    .string()
    .describe('A summary of historical rental data for context.'),
});
export type PredictiveDemandInput = z.infer<typeof PredictiveDemandInputSchema>;

const ToolPredictionSchema = z.object({
  toolName: z.string().describe('The name of the tool.'),
  predictedDemand: z.enum(['High', 'Medium', 'Low']).describe('The predicted level of demand.'),
  reasoning: z.string().describe('The reasoning behind the prediction, mentioning crop cycles or typical activities.'),
});

export const PredictiveDemandOutputSchema = z.object({
  predictions: z.array(ToolPredictionSchema).describe('A list of tool demand predictions for the season.'),
});
export type PredictiveDemandOutput = z.infer<typeof PredictiveDemandOutputSchema>;

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

Focus on the top 3-4 most relevant tools for the season. Provide clear reasoning for each prediction. For example, during planting season, seeders and plows would be in high demand.
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
