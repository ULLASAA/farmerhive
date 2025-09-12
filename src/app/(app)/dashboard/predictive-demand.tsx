'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getToolDemandPrediction } from '@/app/actions';
import type { PredictiveDemandInput, PredictiveDemandOutput } from '@/ai/flows/predictive-tool-demand';
import { Loader2, BrainCircuit, BarChart, LineChart, TrendingUp, TrendingDown, Tractor } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type Season = 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)';

const historicalDataSummary = "Past rentals show high demand for tractors and harvesters year-round. Plows and seeders peak pre-monsoon and pre-winter. Irrigation tools are most popular in the dry summer months.";

export default function PredictiveDemand() {
  const { toast } = useToast();
  const [season, setSeason] = useState<Season>('Kharif (Monsoon)');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictiveDemandOutput | null>(null);

  const handleGeneratePrediction = async () => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const input: PredictiveDemandInput = {
        region: 'Punjab',
        season: season,
        historicalData: historicalDataSummary,
      };
      const result = await getToolDemandPrediction(input);

      if (result.success && result.data) {
        setPrediction(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Prediction Error',
          description: result.error || 'Failed to generate demand prediction.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'An error occurred while fetching the prediction.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getDemandIcon = (demand: 'High' | 'Medium' | 'Low') => {
    switch (demand) {
      case 'High':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'Medium':
        return <LineChart className="h-5 w-5 text-yellow-500" />;
      case 'Low':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <BarChart className="h-5 w-5 text-muted-foreground" />;
    }
  };


  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          Predictive Tool Demand
        </CardTitle>
        <CardDescription>
          Use AI to forecast tool demand for the upcoming farming season in Punjab.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={season} onValueChange={(value) => setSeason(value as Season)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kharif (Monsoon)">Kharif (Monsoon)</SelectItem>
              <SelectItem value="Rabi (Winter)">Rabi (Winter)</SelectItem>
              <SelectItem value="Zaid (Summer)">Zaid (Summer)</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGeneratePrediction} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Analyze Demand
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center rounded-md border p-6 text-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <span className="text-lg">AI is analyzing market trends...</span>
          </div>
        )}

        {prediction && (
          <div className="space-y-4 pt-4">
             <Alert>
                <Tractor className="h-4 w-4" />
                <AlertTitle>AI Analysis for {season} Season</AlertTitle>
                <AlertDescription>
                    Based on seasonal patterns and historical data, here are the predicted tool needs.
                </AlertDescription>
            </Alert>
            <div className="grid gap-4 sm:grid-cols-2">
              {prediction.predictions.map((pred, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                     <h3 className="font-semibold text-lg">{pred.toolName}</h3>
                     <div className="flex items-center gap-2 text-sm font-medium">
                        {getDemandIcon(pred.predictedDemand)}
                        <span>{pred.predictedDemand} Demand</span>
                     </div>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">{pred.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
