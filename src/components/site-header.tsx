import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User, PlusCircle, Bell } from 'lucide-react';
import { Icons } from './icons';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/rent" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              farmerhive
            </span>
          </Link>
        </div>
        
        <div className='md:hidden'>
            <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
              <Link href="/rent/upload">
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload Tool
              </Link>
          </Button>

           <Button asChild variant="ghost" className="relative h-9 w-9 rounded-full">
            <Link href="/notifications">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
                 <span className="absolute right-1 top-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1644074165222-4b8b4de20fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmYXJtZXIlMjBwaG90b3xlbnwwfHx8fDE3NTc2OTg1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Farmer's Avatar"
                    data-ai-hint="farmer avatar"
                  />
                  <AvatarFallback>KK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Kisan Kumar</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    kisan.kumar@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                     <span className="ml-auto text-xs font-bold text-primary-foreground bg-primary rounded-full px-2 py-0.5">1</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
