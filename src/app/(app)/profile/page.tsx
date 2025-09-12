import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ProfilePage() {
  const farmer = {
    name: 'Kisan Kumar',
    email: 'kisan.kumar@example.com',
    phone: '+91-9876543210',
    address: '123 Kisan Nagar, Anaj Mandi, Punjab 141001',
    avatarUrl: 'https://picsum.photos/seed/farmer-avatar/200/200',
    coverImageUrl: 'https://images.unsplash.com/photo-1693599112348-87e90fdfa26d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmYXJtJTIwcGhvdG98ZW58MHx8fHwxNzU3Njk4NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">My Profile</h1>
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={farmer.coverImageUrl}
            alt="Farm background"
            fill
            className="object-cover"
            data-ai-hint="farm background"
          />
        </div>
        <CardHeader className="relative -mt-16 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={farmer.avatarUrl} alt={farmer.name} data-ai-hint="farmer avatar" />
            <AvatarFallback className="text-4xl">KK</AvatarFallback>
          </Avatar>
          <div className="mt-4 sm:ml-4">
            <CardTitle className="text-2xl font-bold">{farmer.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Mail className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a href={`mailto:${farmer.email}`} className="text-base text-primary hover:underline">
                  {farmer.email}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Phone className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <a href={`tel:${farmer.phone}`} className="text-base text-primary hover:underline">
                  {farmer.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4 md:col-span-2">
              <MapPin className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-base">{farmer.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
