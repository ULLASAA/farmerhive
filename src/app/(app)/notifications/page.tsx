'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Clock, Tractor } from 'lucide-react';
import { rentalItems } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';

const initialNotifications = [
  {
    id: 'noti-1',
    type: 'bargain-offer',
    itemId: '1', // Tractor
    renter: {
      name: 'Ravi Kumar',
      avatarUrl: 'https://i.pravatar.cc/150?u=ravi-kumar'
    },
    offer: {
      price: 650,
      unit: 'hour',
      duration: '4 hours',
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: 'noti-2',
    type: 'bargain-response',
    itemId: '9', // Seeder
    owner: {
      name: 'Manpreet Kaur'
    },
    status: 'accepted',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  }
];


export default function NotificationsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleAccept = (notificationId: string, itemId: string, price: number) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        toast({
            title: 'Offer Accepted!',
            description: 'The renter has been notified. You can proceed to booking.',
        });
        router.push(`/book/${itemId}?price=${price}`);
    };

    const handleReject = (notificationId: string) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        toast({
            variant: 'destructive',
            title: 'Offer Rejected',
            description: 'The renter has been notified of your decision.',
        });
    };

    const formatTimeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const pendingOffers = notifications.filter(n => n.type === 'bargain-offer' && n.status === 'pending');
    const otherNotifications = notifications.filter(n => n.type !== 'bargain-offer' || n.status !== 'pending');


  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Notifications</h1>
      
      {pendingOffers.length > 0 && (
         <div className="space-y-6">
            <h2 className="text-xl font-semibold">Action Required</h2>
            {pendingOffers.map(noti => {
                 const item = rentalItems.find(i => i.id === noti.itemId);
                 if (!item) return null;

                 return (
                    <Card key={noti.id} className="overflow-hidden">
                         <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">New Bargain Offer</CardTitle>
                                <Badge variant="secondary"><Clock className="mr-1.5 h-3.5 w-3.5" />{formatTimeAgo(noti.createdAt)}</Badge>
                            </div>
                            <CardDescription>You have a new rental offer from {noti.renter.name}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-col sm:flex-row gap-6">
                                <div className="relative h-40 w-full sm:w-48 flex-shrink-0 overflow-hidden rounded-md">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow space-y-3">
                                    <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                                    <p><strong>Renter:</strong> {noti.renter.name}</p>
                                    <p><strong>Offered Price:</strong> <span className="font-bold text-lg">Rs {noti.offer.price.toFixed(2)} / {noti.offer.unit}</span></p>
                                    <p><strong>Duration:</strong> {noti.offer.duration}</p>
                                     <p className="text-sm text-muted-foreground">Original Price: Rs {item.price.toFixed(2)} / {item.unit}</p>
                                </div>
                             </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 bg-muted/50 p-4">
                            <Button variant="destructive" onClick={() => handleReject(noti.id)}>
                                <X className="mr-2 h-4 w-4"/> Reject
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAccept(noti.id, item.id, noti.offer.price)}>
                                <Check className="mr-2 h-4 w-4"/> Accept Offer
                            </Button>
                        </CardFooter>
                    </Card>
                 )
            })}
        </div>
      )}

      <div className={pendingOffers.length > 0 ? "mt-12" : ""}>
        <h2 className="text-xl font-semibold mb-6">Past Notifications</h2>
        {otherNotifications.length > 0 ? (
            <div className="space-y-4">
                 {otherNotifications.map(noti => {
                     const item = rentalItems.find(i => i.id === noti.itemId);
                     if (!item) return null;
                     return (
                        <div key={noti.id} className="flex items-center gap-4 rounded-lg border p-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${noti.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {noti.status === 'accepted' ? <Check className="h-5 w-5"/> : <X className="h-5 w-5"/>}
                            </div>
                            <div className="flex-grow">
                                <p>Your bargain for <Link href={`/bargain/${item.id}`} className="font-semibold text-primary hover:underline">{item.name}</Link> was <span className={noti.status === 'accepted' ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>{noti.status}</span> by the owner.</p>
                                <p className="text-sm text-muted-foreground">{formatTimeAgo(noti.createdAt)}</p>
                            </div>
                            {noti.status === 'accepted' && (
                                <Button asChild size="sm">
                                    <Link href={`/book/${item.id}`}>Proceed to Book</Link>
                                </Button>
                            )}
                        </div>
                     )
                 })}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                <Tractor className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No other notifications yet.</h3>
                <p className="max-w-xs">Your past notifications and bargain responses will appear here.</p>
            </div>
        )}
      </div>

    </div>
  );
}