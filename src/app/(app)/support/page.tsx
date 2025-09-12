import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export default function SupportPage() {
  const callCenterNumber = '1800-200-5555';

  return (
    <div className="container mx-auto flex h-full items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Call Center Support</CardTitle>
          <CardDescription>
            Our team is here to help. Contact us for any questions or issues regarding rentals, payments, or account support.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 rounded-full border bg-primary/10 p-4 text-primary">
            <Phone className="h-8 w-8" />
            <span className="text-4xl font-bold tracking-wider">{callCenterNumber}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Available Monday - Friday, 9 AM - 7 PM IST
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={`tel:${callCenterNumber.replace(/-/g, '')}`}>
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    