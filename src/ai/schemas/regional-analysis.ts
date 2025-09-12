/**
 * @fileOverview Zod schemas and TypeScript types for the regional analysis AI flow.
 *
 * - RegionalAnalysisInput - The input type for the getRegionalAnalysis function.
 * - RegionalAnalysisOutput - The return type for the getRegionalAnalysis function.
 * - RegionalAnalysisInputSchema - The Zod schema for the input.
 * - RegionalAnalysisOutputSchema - The Zod schema for the output.
 */

import { z } from 'genkit';

export const RegionalAnalysisInputSchema = z.object({
  region: z.string().describe('The agricultural region, e.g., Punjab.'),
  season: z.enum(['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)']).describe('The current farming season.'),
});
export type RegionalAnalysisInput = z.infer<typeof RegionalAnalysisInputSchema>;

export const RegionalAnalysisOutputSchema = z.object({
  analysis: z.string().describe('A 2-3 sentence summary of the typical crop cycles, climate, and their impact on tool demand for the specified region and season.'),
});
export type RegionalAnalysisOutput = z.infer<typeof RegionalAnalysisOutputSchema>;
