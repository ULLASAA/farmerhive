'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import {
  Tractor,
  User,
  Phone,
  LogOut,
  ShoppingCart,
  MapPin,
  Bell,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const callCenterNumber = '1800-200-5555';
  const mapUrl = "https://www.google.com/maps/place/Anaj+Mandi/@30.8973143,75.8360695,17z/data=!3m1!4b1!4m6!3m5!1s0x391a8300945d8b7b:0x1b693e25c8987926!8m2!3d30.8973097!4d75.8386444!16s%2Fg%2F1tdy3jhp?entry=ttu";


  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link href="/rent" className="flex items-center gap-2">
                <Icons.logo className="size-7 text-primary" />
                <span className="text-lg font-semibold">farmerhive</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/dashboard')}
                  tooltip={{ children: 'Dashboard' }}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/rent')}
                  tooltip={{ children: 'Rentals' }}
                >
                  <Link href="/rent">
                    <Tractor />
                    <span>Rentals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/buy')}
                  tooltip={{ children: 'Buy' }}
                >
                  <Link href="/buy">
                    <ShoppingCart />
                    <span>Buy</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/notifications')}
                  tooltip={{ children: 'Notifications' }}
                >
                  <Link href="/notifications">
                    <Bell />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/profile'}
                  tooltip={{ children: 'Profile' }}
                >
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/support'}
                  tooltip={{ children: 'Support' }}
                >
                  <Link href="/support">
                    <Phone />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarSeparator />
             <div className="p-2 text-sm text-sidebar-foreground/70 space-y-2 group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sidebar-foreground">Contact Support</p>
                 <a href={`tel:${callCenterNumber.replace(/-/g, '')}`} className="flex items-center gap-2 hover:text-sidebar-accent-foreground">
                    <Phone className="size-4" />
                    <span>{callCenterNumber}</span>
                </a>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sidebar-accent-foreground">
                    <MapPin className="size-4" />
                    <span>View on Map</span>
                </a>
             </div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{children: 'Logout'}}>
                        <Link href="/">
                            <LogOut />
                            <span>Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
            <SiteHeader />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
