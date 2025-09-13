'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getFullDemandAnalysis } from '@/app/actions';
import type { PredictiveDemandInput, PredictiveDemandOutput } from '@/ai/schemas/predictive-tool-demand';
import type { RegionalAnalysisOutput } from '@/ai/flows/regional-analysis';
import { Loader2, BrainCircuit, BarChart, LineChart, TrendingUp, TrendingDown, Wheat, Sun, CloudRain } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type Season = 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const historicalDataSummary = "Past rentals show high demand for tractors and harvesters year-round. Plows and seeders peak pre-monsoon and pre-winter. Irrigation tools are most popular in the dry summer months.";

type FullAnalysis = {
  analysis: RegionalAnalysisOutput;
  predictions: PredictiveDemandOutput;
}

export default function PredictiveDemand() {
  const { toast } = useToast();
  const [season, setSeason] = useState<Season>('Kharif (Monsoon)');
  const [region, setRegion] = useState<string>('Punjab');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FullAnalysis | null>(null);

  const handleGeneratePrediction = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const input: PredictiveDemandInput = {
        region: region,
        season: season,
        historicalData: historicalDataSummary,
      };
      const result = await getFullDemandAnalysis(input);

      if (result.success && result.data) {
        setAnalysis(result.data);
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
        return <TrendingUp className="h-6 w-6 text-green-500" />;
      case 'Medium':
        return <LineChart className="h-6 w-6 text-yellow-500" />;
      case 'Low':
        return <TrendingDown className="h-6 w-6 text-red-500" />;
      default:
        return <BarChart className="h-6 w-6 text-muted-foreground" />;
    }
  };
  
  const getSeasonIcon = (selectedSeason: Season) => {
    switch(selectedSeason) {
      case 'Kharif (Monsoon)': return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'Rabi (Winter)': return <Wheat className="h-5 w-5 text-amber-500" />;
      case 'Zaid (Summer)': return <Sun className="h-5 w-5 text-orange-500" />;
    }
  }


  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
      <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
                <BrainCircuit className="text-primary" size={28} />
                AI Demand Forecast
            </CardTitle>
            <CardDescription className="mt-2 text-base">
                Predictive analysis for tool rental demand in {region}.
            </CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={season} onValueChange={(value) => setSeason(value as Season)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kharif (Monsoon)">Kharif (Monsoon)</SelectItem>
              <SelectItem value="Rabi (Winter)">Rabi (Winter)</SelectItem>
              <SelectItem value="Zaid (Summer)">Zaid (Summer)</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGeneratePrediction} disabled={isLoading} size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-5 w-5" />
            )}
            Analyze
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold">AI is analyzing market data for {region}...</p>
            <p className="text-muted-foreground">This may take a moment. Please wait.</p>
          </div>
        )}

        {!isLoading && !analysis && (
             <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                <BrainCircuit className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold">Ready for Analysis</p>
                <p className="text-muted-foreground">Select a region and season, then click "Analyze" to generate a demand forecast.</p>
            </div>
        )}

        {analysis && (
          <div className="space-y-6">
             <Alert className="border-primary/50 bg-primary/5 text-primary-foreground">
                <div className="flex items-center gap-3">
                   {getSeasonIcon(season)}
                   <AlertTitle className="text-lg font-semibold text-primary">AI Analysis for {season} Season in {region}</AlertTitle>
                </div>
                <AlertDescription className="text-primary/90 mt-2">
                    {analysis.analysis.analysis}
                </AlertDescription>
            </Alert>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {analysis.predictions.predictions.map((pred, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-bold">{pred.toolName}</CardTitle>
                     {getDemandIcon(pred.predictedDemand)}
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                     <div className={`text-lg font-semibold ${pred.predictedDemand === 'High' ? 'text-green-500' : pred.predictedDemand === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                        {pred.predictedDemand} Demand
                     </div>
                     <Separator />
                     <p className="text-sm text-muted-foreground pt-2">{pred.reasoning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
