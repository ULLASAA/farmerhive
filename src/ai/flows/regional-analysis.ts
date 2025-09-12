'use server';

/**
 * @fileOverview Provides a high-level analysis of a region's agricultural profile for a given season.
 *
 * - getRegionalAnalysis - A function that generates a summary of crop cycles and climate.
 */

import { ai } from '@/ai/genkit';
import {
  RegionalAnalysisInputSchema,
  RegionalAnalysisOutputSchema,
  type RegionalAnalysisInput,
  type RegionalAnalysisOutput
} from '@/ai/schemas/regional-analysis';


export async function getRegionalAnalysis(input: RegionalAnalysisInput): Promise<RegionalAnalysisOutput> {
  return regionalAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regionalAnalysisPrompt',
  input: { schema: RegionalAnalysisInputSchema },
  output: { schema: RegionalAnalysisOutputSchema },
  prompt: `You are an agricultural economist specializing in the Indian market. Provide a brief, 2-3 sentence summary analyzing the agricultural landscape for the given region and season.

Your summary should touch upon:
- The primary crops planted or harvested.
- The typical climate conditions.
- The general impact these factors have on tool and equipment needs.

Do not list specific tools. Keep the analysis high-level and concise.

Region: {{{region}}}
Season: {{{season}}}
`,
});

const regionalAnalysisFlow = ai.defineFlow(
  {
    name: 'regionalAnalysisFlow',
    inputSchema: RegionalAnalysisInputSchema,
    outputSchema: RegionalAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
