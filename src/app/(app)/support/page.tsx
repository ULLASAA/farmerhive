import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function SupportPage() {
  const callCenterNumber = '1800-200-5555';
  const address = '123 Kisan Nagar, Anaj Mandi, Punjab 141001';
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.631952458421!2d75.83606951513508!3d30.89731428158583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8300945d8b7b%3A0x1b693e25c8987926!2sAnaj%20Mandi!5e0!3m2!1sen!2sin!4v1678886400000";


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <Card className="w-full max-w-lg mb-8">
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

        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Our Location</CardTitle>
                <CardDescription>
                    Visit our main office for in-person support.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="mt-6 space-y-4 text-left">
                     <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 shrink-0 text-muted-foreground mt-1" />
                        <div>
                            <p className="font-semibold">Address</p>
                            <p className="text-muted-foreground">{address}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 shrink-0 text-muted-foreground mt-1" />
                        <div>
                            <p className="font-semibold">Office Hours</p>
                            <p className="text-muted-foreground">Monday - Friday, 9 AM - 5 PM IST</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
