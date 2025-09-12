'use server';

import {
  getBargainingSuggestion,
  type BargainingSuggestionInput,
} from '@/ai/flows/bargaining-suggestions';
import {
  getPredictiveDemand,
  type PredictiveDemandInput,
} from '@/ai/flows/predictive-tool-demand';
import {
  getRegionalAnalysis,
  type RegionalAnalysisInput,
} from '@/ai/flows/regional-analysis';

export async function generateSuggestions(input: BargainingSuggestionInput) {
  try {
    // Add market conditions data as required by the prompt
    const fullInput = {
      ...input,
      marketConditions: 'The local market is competitive, with rental prices for similar items varying by 15-20% based on condition and availability. Renters are currently looking for flexible duration options.'
    }
    const result = await getBargainingSuggestion(fullInput);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return { success: false, error: 'Failed to generate bargaining suggestions. Please try again later.' };
  }
}

export async function getToolDemandPrediction(input: PredictiveDemandInput) {
  try {
    const result = await getPredictiveDemand(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating tool demand prediction:', error);
    return { success: false, error: 'Failed to generate prediction. Please try again.' };
  }
}

export async function getFullDemandAnalysis(input: RegionalAnalysisInput & PredictiveDemandInput) {
  try {
    const [analysisResult, predictionResult] = await Promise.all([
      getRegionalAnalysis(input),
      getPredictiveDemand(input),
    ]);
    return { success: true, data: { analysis: analysisResult, predictions: predictionResult } };
  } catch (error) {
    console.error('Error generating full demand analysis:', error);
    return { success: false, error: 'Failed to generate the full analysis. Please try again.' };
  }
}
