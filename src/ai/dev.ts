import { config } from 'dotenv';
config();

import '@/ai/flows/bargaining-suggestions.ts';
import '@/ai/flows/late-fee-assessor.ts';
import '@/ai/flows/predictive-tool-demand.ts';
import '@/ai/flows/regional-analysis.ts';
import '@/ai/schemas/predictive-tool-demand.ts';
import '@/ai/schemas/regional-analysis.ts';
