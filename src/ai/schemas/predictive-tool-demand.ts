/**
 * @fileOverview Zod schemas and TypeScript types for the predictive tool demand AI flow.
 *
 * - PredictiveDemandInput - The input type for the getPredictiveDemand function.
 * - PredictiveDemandOutput - The return type for the getPredictiveDemand function.
 * - PredictiveDemandInputSchema - The Zod schema for the input.
 * - PredictiveDemandOutputSchema - The Zod schema for the output.
 */

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
