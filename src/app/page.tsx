import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Spade } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Spade className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">farmerhive</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[calc(100vh-3.5rem)] w-full">
          <Image
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYW5vbGElMjBmaWVsZHxlbnwwfHx8fDE3NTgwMjU0Njd8MA&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Agricultural field"
            fill
            className="object-cover"
            data-ai-hint="cinematic field"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Connecting Farmers, Sharing Resources
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl">
              The easiest way to rent and share agricultural tools, seeds, and supplies with your fellow farmers.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/rent">Browse Rentals</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
